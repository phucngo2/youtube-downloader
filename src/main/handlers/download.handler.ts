import { app, ipcMain } from "electron";
import { Worker } from "node:worker_threads";
import {
  EVENT_DOWNLOAD_AUDIO,
  EVENT_DOWNLOAD_VIDEO,
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
} from "../config";
import {
  IDownloadMessage,
  IDownloadRequest,
  IDownloadResult,
  IRenderRequest,
} from "../types";
import videoDownloadWorkerPath from "../workers/video-download.worker?modulePath";
import audioDownloadWorkerPath from "../workers/audio-download.worker?modulePath";

export function registerDownloadHandlers() {
  ipcMain.on(EVENT_DOWNLOAD_VIDEO, (event, request: IDownloadRequest) => {
    try {
      handleWorkerDownload(event, request, videoDownloadWorkerPath);
    } catch (e) {
      console.error("Error downloading media:", e);
    }
  });

  ipcMain.on(EVENT_DOWNLOAD_AUDIO, (event, request: IDownloadRequest) => {
    try {
      handleWorkerDownload(event, request, audioDownloadWorkerPath);
    } catch (e) {
      console.error("Error downloading audio:", e);
    }
  });
}

function handleWorkerDownload(
  event: Electron.IpcMainEvent,
  request: IDownloadRequest,
  workerPath: string,
) {
  const workerData: IRenderRequest = {
    ...request,
    isPackaged: app.isPackaged,
  };

  const worker = new Worker(workerPath, {
    workerData,
  });

  worker.on("message", (message: IDownloadMessage | IDownloadResult) => {
    if ("status" in message) {
      event.sender.send(EVENT_DOWNLOAD_VIDEO_RESULT, message);
    } else {
      event.sender.send(EVENT_DOWNLOAD_VIDEO_PROGRESS, message);
    }
  });
}
