import { ipcMain } from "electron";
import ytdl from "@distube/ytdl-core";
import { EVENT_GET_VIDEO_INFO } from "../config";
import { IVideoInfo } from "../types";
import { mapToIVideoInfo } from "../utils";

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
    }
  );
}
