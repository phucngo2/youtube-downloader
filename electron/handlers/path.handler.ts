import { app, ipcMain } from "electron";
import { EVENT_GET_DOWNLOADS_PATH } from "../config";

export function registerPathHandlers() {
  ipcMain.handle(
    EVENT_GET_DOWNLOADS_PATH,
    async (_event): Promise<string | null> => {
      try {
        // https://github.com/electron/electron/blob/main/docs/api/app.md#appgetpathname
        let res = app.getPath("downloads");
        return res;
      } catch (e) {
        console.error("Error getting downloads path:", e);
        return null;
      }
    }
  );
}
