import { EVENT_DOWNLOAD_VIDEO } from "@server/config";
import { IDownloadRequest } from "@server/types";

export const sendDownloadVideoEvent = (request: IDownloadRequest): void => {
  window.electron.ipcRenderer.send(EVENT_DOWNLOAD_VIDEO, request);
};
