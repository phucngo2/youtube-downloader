import ytdl from "@distube/ytdl-core";
import { ipcMain } from "electron";
import { EVENT_DOWNLOAD_VIDEO, EVENT_GET_VIDEO_INFO } from "../config";
import { IDownloadRequest, IVideoInfo } from "../types";
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
      VideoDownloadWorker({ workerData: request });
    } catch (e) {
      console.error("Error downloading media:", e);
    }
  });
}
