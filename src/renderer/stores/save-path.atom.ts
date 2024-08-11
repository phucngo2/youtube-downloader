import { invokeSavePathEvent } from "@renderer/modules/search-form/handlers";
import { AppStorage } from "@renderer/utils";
import { atom } from "jotai";

const getInitialValue = async () => {
  const savePath = AppStorage.getSavePath();
  if (savePath) {
    return savePath;
  }
  const res: string | null = await invokeSavePathEvent();
  return res || "";
};

export const savePathAtom = atom<string>(await getInitialValue());
