import { EVENT_GET_DOWNLOADS_PATH, EVENT_GET_VIDEO_INFO } from "@server/config";
import { IVideoInfo } from "@server/types";

export const invokeSearchEvent = async (
  searchValue: string
): Promise<IVideoInfo | null> => {
  const res = await window.ipcRenderer.invoke(
    EVENT_GET_VIDEO_INFO,
    searchValue
  );
  return res;
};

export const invokeSavePathEvent = async () => {
  const res = await window.ipcRenderer.invoke(EVENT_GET_DOWNLOADS_PATH);
  return res;
};
