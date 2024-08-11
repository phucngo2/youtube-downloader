import {
  EVENT_OPEN_PATH,
  EVENT_OPEN_FILE_LOCATION,
  EVENT_DOWNLOAD_CANCEL,
} from "@main/config";
import { IDownloadCancelRequest } from "@main/types";

export const invokeOpenPathEvent = (path: string) => {
  window.electron.ipcRenderer.invoke(EVENT_OPEN_PATH, path);
};

export const invokeOpenFileLocationEvent = (path: string) => {
  window.electron.ipcRenderer.invoke(EVENT_OPEN_FILE_LOCATION, path);
};

export const invokeCancelDownloadEvent = (request: IDownloadCancelRequest) => {
  return window.electron.ipcRenderer.invoke(EVENT_DOWNLOAD_CANCEL, request);
};
