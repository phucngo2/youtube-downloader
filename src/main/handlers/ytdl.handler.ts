import ytdl from "@distube/ytdl-core";
import { app, ipcMain } from "electron";
import {
  EVENT_DOWNLOAD_VIDEO,
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
  EVENT_GET_VIDEO_INFO,
} from "../config";
import {
  IDownloadMessage,
  IDownloadRequest,
  IDownloadResult,
  IRenderRequest,
  IVideoInfo,
} from "../types";
import { mapToIVideoInfo } from "../utils";
import VideoDownloadWorker from "../workers/video-download.worker?nodeWorker";

export function registerYtdlHandlers() {
  ipcMain.handle(
    EVENT_GET_VIDEO_INFO,
    async (_event, searchValue): Promise<IVideoInfo | null> => {
      try {
        const videoInfo = await ytdl.getInfo(searchValue);
        return mapToIVideoInfo(videoInfo);
      } catch (e) {
        console.error("Error fetching video info:", e);
        return null;
      }
    },
  );

  ipcMain.on(EVENT_DOWNLOAD_VIDEO, (event, request: IDownloadRequest) => {
    try {
      const workerData: IRenderRequest = {
        ...request,
        isPackaged: app.isPackaged,
      };
      VideoDownloadWorker({
        workerData,
      }).on("message", (message: IDownloadMessage | IDownloadResult) => {
        if ("isSuccess" in message) {
          event.sender.send(EVENT_DOWNLOAD_VIDEO_RESULT, message);
        } else {
          event.sender.send(EVENT_DOWNLOAD_VIDEO_PROGRESS, message);
        }
      });
    } catch (e) {
      console.error("Error downloading media:", e);
    }
  });
}
