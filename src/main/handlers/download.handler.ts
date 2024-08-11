import { ipcMain } from "electron";
import {
  EVENT_DOWNLOAD_AUDIO,
  EVENT_DOWNLOAD_CANCEL,
  EVENT_DOWNLOAD_VIDEO,
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
  EVENT_DOWNLOADING,
} from "../config";
import {
  IDownloadCancelRequest,
  IDownloadMessage,
  IDownloadRequest,
  IDownloadResult,
} from "../types";
import { registerWorker, unregisterWorker } from "../utils";
import { getSavePathMp3, getSavePathMp4 } from "../utils";
import audioDownloadWorkerPath from "../workers/audio-download.worker?modulePath";
import videoDownloadWorkerPath from "../workers/video-download.worker?modulePath";

export function registerDownloadHandlers() {
  ipcMain.on(EVENT_DOWNLOAD_VIDEO, (event, request: IDownloadRequest) => {
    try {
      request.savePath = getSavePathMp4(request);
      handleWorkerDownload(event, request, videoDownloadWorkerPath);
    } catch (e) {
      console.error("Error downloading media:", e);
    }
  });

  ipcMain.on(EVENT_DOWNLOAD_AUDIO, (event, request: IDownloadRequest) => {
    try {
      request.savePath = getSavePathMp3(request);
      handleWorkerDownload(event, request, audioDownloadWorkerPath);
    } catch (e) {
      console.error("Error downloading audio:", e);
    }
  });

  ipcMain.handle(
    EVENT_DOWNLOAD_CANCEL,
    async (_, request: IDownloadCancelRequest) => {
      try {
        await unregisterWorker(request);
      } catch (e) {
        console.error("Error cancel download:", e);
      }
    },
  );
}

async function handleWorkerDownload(
  event: Electron.IpcMainEvent,
  request: IDownloadRequest,
  workerPath: string,
) {
  const worker = await registerWorker(request, workerPath);
  worker.on("message", (message: IDownloadMessage | IDownloadResult) => {
    if ("status" in message) {
      event.sender.send(EVENT_DOWNLOAD_VIDEO_RESULT, message);
    } else {
      event.sender.send(EVENT_DOWNLOAD_VIDEO_PROGRESS, message);
    }
  });
  event.sender.send(EVENT_DOWNLOADING);
}
