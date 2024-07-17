import { EVENT_GET_VIDEO_INFO } from "@server/config";
import { IVideoInfo } from "@server/types";

export const sendSearchEvent = async (
  searchValue: string
): Promise<IVideoInfo | null> => {
  const res = await window.ipcRenderer.invoke(
    EVENT_GET_VIDEO_INFO,
    searchValue
  );
  return res;
};
