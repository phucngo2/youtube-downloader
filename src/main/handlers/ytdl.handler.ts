import ytdl from "@distube/ytdl-core";
import { app, ipcMain } from "electron";
import { EVENT_DOWNLOAD_VIDEO, EVENT_GET_VIDEO_INFO } from "../config";
import { IDownloadRequest, IRenderRequest, IVideoInfo } from "../types";
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

  ipcMain.on(EVENT_DOWNLOAD_VIDEO, (_event, request: IDownloadRequest) => {
    try {
      const workerData: IRenderRequest = {
        ...request,
        isPackaged: app.isPackaged,
      };
      VideoDownloadWorker({
        workerData,
      });
    } catch (e) {
      console.error("Error downloading media:", e);
    }
  });
}
