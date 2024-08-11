import { app } from "electron";
import { Worker } from "node:worker_threads";
import {
  IDownloadCancelRequest,
  IDownloadRequest,
  IRenderRequest,
  IWorkersMap,
} from "../types";
import { tryUnlinkFile } from "./files";

const WorkersMapSingleton = (function () {
  let instance: IWorkersMap | undefined;
  function init() {
    let workersMap = new Map();
    return workersMap;
  }

  return {
    getInstance: function (): IWorkersMap {
      if (!instance) instance = init();
      return instance;
    },
  };
})();

export const unregisterWorker = async (request: IDownloadCancelRequest) => {
  const workerKey = generateWorkerKey(request);
  cleanupWorker(workerKey);
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

  worker.on("exit", () => {
    workersMap.delete(workerKey);
  });

  return worker;
};

export const cleanupWorkers = async () => {
  const workersMap = WorkersMapSingleton.getInstance();
  for (let [key] of workersMap) {
    await cleanupWorker(key);
  }
};

//#region Private

function generateWorkerKey(request: IDownloadCancelRequest): string {
  return `${request.videoId}-${request.itag}`;
}

async function cleanupWorker(workerKey: string) {
  const workersMap = WorkersMapSingleton.getInstance();
  const workerMapValue = workersMap.get(workerKey);

  if (workerMapValue) {
    const worker = workerMapValue.worker;
    const savePath = workerMapValue.savePath;
    await worker.terminate();

    await tryUnlinkFile(savePath);

    workersMap.delete(workerKey);
  }
}

//#endregion
