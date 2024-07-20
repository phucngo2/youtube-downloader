import { app, dialog, ipcMain } from "electron";
import { EVENT_GET_DOWNLOADS_PATH, EVENT_OPEN_DIR_DIALOG } from "../config";
import { IOpenDirDialogResult } from "@server/types";

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

  ipcMain.handle(
    EVENT_OPEN_DIR_DIALOG,
    async (_event): Promise<IOpenDirDialogResult> => {
      try {
        let res = await dialog.showOpenDialog({
          properties: ["openDirectory"],
        });

        return {
          canceled: res.canceled,
          filePath: res.filePaths[0],
        };
      } catch (e) {
        console.error("Error getting downloads path:", e);
        return {
          canceled: true,
        };
      }
    }
  );
}
