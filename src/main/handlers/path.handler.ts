import { app, dialog, ipcMain, shell } from "electron";
import fs from "node:fs";
import {
  EVENT_GET_DOWNLOADS_PATH,
  EVENT_OPEN_DIR_DIALOG,
  EVENT_OPEN_FILE_LOCATION,
  EVENT_OPEN_PATH,
} from "../config";
import { IOpenDirDialogResult } from "../types";
import { getFolderPath } from "../utils/helpers";

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
    },
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
    },
  );

  ipcMain.handle(EVENT_OPEN_PATH, (_event, path: string) => {
    try {
      shell.openPath(path);
    } catch (e) {
      console.error("Error opening file:", e);
    }
  });

  ipcMain.handle(EVENT_OPEN_FILE_LOCATION, (_event, path: string) => {
    try {
      if (fs.existsSync(path)) {
        shell.showItemInFolder(path);
      } else {
        shell.openPath(getFolderPath(path));
      }
    } catch (e) {
      console.error("Error opening file location:", e);
    }
  });
}
