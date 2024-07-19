import { EVENT_GET_DOWNLOADS_PATH } from "@server/config";
import { atom } from "jotai";

const getInitialValue = async () => {
  const res: string | null = await window.ipcRenderer.invoke(
    EVENT_GET_DOWNLOADS_PATH
  );
  return res || "";
};

export const savePathAtom = atom<string>(await getInitialValue());
