import { EVENT_OPEN_PATH, EVENT_OPEN_FILE_LOCATION } from "@server/config";

export const invokeOpenPathEvent = (path: string) => {
  window.electron.ipcRenderer.invoke(EVENT_OPEN_PATH, path);
};

export const invokeOpenFileLocationEvent = (path: string) => {
  window.electron.ipcRenderer.invoke(EVENT_OPEN_FILE_LOCATION, path);
};
