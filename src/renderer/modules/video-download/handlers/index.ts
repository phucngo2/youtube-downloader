import { IpcRendererListener } from "@electron-toolkit/preload";
import {
  EVENT_DOWNLOAD_AUDIO,
  EVENT_DOWNLOAD_VIDEO,
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
} from "@main/config";
import { IDownloadRequest } from "@main/types";

export const sendDownloadVideoEvent = (request: IDownloadRequest): void => {
  window.electron.ipcRenderer.send(EVENT_DOWNLOAD_VIDEO, request);
};

export const sendDownloadAudioEvent = (request: IDownloadRequest): void => {
  window.electron.ipcRenderer.send(EVENT_DOWNLOAD_AUDIO, request);
};

export const onDownloadResultEvent = (listener: IpcRendererListener) => {
  window.electron.ipcRenderer.on(EVENT_DOWNLOAD_VIDEO_RESULT, listener);
};

export const onDownloadMessageEvent = (listener: IpcRendererListener) => {
  window.electron.ipcRenderer.on(EVENT_DOWNLOAD_VIDEO_PROGRESS, listener);
};
