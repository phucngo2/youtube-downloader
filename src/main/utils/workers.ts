import { app } from "electron";
import { Worker } from "node:worker_threads";
import { IDownloadRequest, IRenderRequest, IWorkersMap } from "../types";
import fs from "node:fs";

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

export const unregisterWorker = (request: IDownloadRequest) => {
  const workerKey = generateWorkerKey(request);
  const workersMap = WorkersMapSingleton.getInstance();
  const workerMapValue = workersMap.get(workerKey);

  if (workerMapValue) {
    const worker = workerMapValue.worker;
    worker.terminate();
    try {
      if (fs.lstatSync(request.savePath).isFile()) {
        fs.unlinkSync(request.savePath);
      }
    } catch (error) {
      // Handle potential errors (e.g., file not found)
      console.error(`Failed to delete file at ${request.savePath}:`, error);
    }

    workersMap.delete(workerKey);
  }
};

export const registerWorker = (
  request: IDownloadRequest,
  workerPath: string,
): Worker => {
  const workerData: IRenderRequest = {
    ...request,
    isPackaged: app.isPackaged,
  };
  const worker = new Worker(workerPath, {
    workerData,
  });

  const workersMap = WorkersMapSingleton.getInstance();

  // Clean up any existing worker before registering a new one
  unregisterWorker(request);

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

//#region Private

function generateWorkerKey(request: IDownloadRequest): string {
  return `${request.videoId}-${request.itag}`;
}

//#endregion
