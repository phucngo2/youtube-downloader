import { app } from "electron";
import { Worker } from "node:worker_threads";
import {
  IDownloadCancelRequest,
  IDownloadRequest,
  IRenderRequest,
  IWorkersMap,
} from "../types";
import { tryUnlinkFile } from "./files";

class WorkersMapSingleton {
  private static instance: IWorkersMap | undefined;
  public static getInstance(): IWorkersMap {
    if (!this.instance) {
      this.instance = new Map();
    }
    return this.instance;
  }
}

export const unregisterWorker = async (request: IDownloadCancelRequest) => {
  const workerKey = generateWorkerKey(request);
  const workersMap = WorkersMapSingleton.getInstance();
  const workerMapValue = workersMap.get(workerKey);
  if (workerMapValue) {
    const worker = workerMapValue.worker;
    await worker.terminate();
  }
};

export const registerWorker = async (
  request: IDownloadRequest,
  workerPath: string,
): Promise<Worker> => {
  const workerData: IRenderRequest = {
    ...request,
    isPackaged: app.isPackaged,
  };
  const worker = new Worker(workerPath, {
    workerData,
  });

  const workersMap = WorkersMapSingleton.getInstance();

  // Clean up any existing worker before registering a new one
  await unregisterWorker(request);

  const workerKey = generateWorkerKey(request);
  workersMap.set(workerKey, {
    worker,
    savePath: request.savePath,
  });

  worker.on("exit", async (exitCode: number) => {
    if (exitCode == 0) {
      workersMap.delete(workerKey);
      return;
    }
    await cleanupWorker(workerKey);
  });

  return worker;
};

export const cleanupWorkers = async () => {
  const workersMap = WorkersMapSingleton.getInstance();
  for (let [key] of workersMap) {
    await cleanupWorker(key);
  }
};

export const hasProcessingWorkers = () => {
  const workersMap = WorkersMapSingleton.getInstance();
  return workersMap.size > 0;
};

//#region Private

function generateWorkerKey(request: IDownloadCancelRequest): string {
  return `${request.videoId}-${request.itag}`;
}

const ongoingCleanups = new Set<string>();
async function cleanupWorker(workerKey: string) {
  // If cleanup is already ongoing for this worker, skip it
  if (ongoingCleanups.has(workerKey)) {
    return;
  }

  try {
    ongoingCleanups.add(workerKey);

    const workersMap = WorkersMapSingleton.getInstance();
    const workerMapValue = workersMap.get(workerKey);

    if (workerMapValue) {
      const worker = workerMapValue.worker;
      const savePath = workerMapValue.savePath;
      await worker.terminate();

      await tryUnlinkFile(savePath);

      workersMap.delete(workerKey);
    }
  } catch (e) {
    console.error("Error cleanup worker", e);
  } finally {
    ongoingCleanups.delete(workerKey);
  }
}

//#endregion
