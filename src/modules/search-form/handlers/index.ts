import { EVENT_GET_VIDEO_INFO } from "@server/config";

export const sendSearchEvent = async (searchValue: string) => {
  const res = await window.ipcRenderer.invoke(
    EVENT_GET_VIDEO_INFO,
    searchValue
  );
  return res;
};
