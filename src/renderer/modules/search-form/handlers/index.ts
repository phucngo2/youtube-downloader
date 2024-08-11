import {
  EVENT_GET_DOWNLOADS_PATH,
  EVENT_GET_VIDEO_INFO,
  EVENT_OPEN_DIR_DIALOG,
} from "@main/config";
import { IOpenDirDialogResult, IVideoInfo } from "@main/types";

export const invokeSearchEvent = async (
  searchValue: string,
): Promise<IVideoInfo | null> => {
  const res = await window.electron.ipcRenderer.invoke(
    EVENT_GET_VIDEO_INFO,
    searchValue,
  );
  return res;
};

export const invokeSavePathEvent = async (): Promise<string | null> => {
  const res = await window.electron.ipcRenderer.invoke(
    EVENT_GET_DOWNLOADS_PATH,
  );
  return res;
};

export const invokeOpenDirDialog = async (): Promise<IOpenDirDialogResult> => {
  const res = await window.electron.ipcRenderer.invoke(EVENT_OPEN_DIR_DIALOG);
  return res;
};
