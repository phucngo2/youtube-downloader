import { savePathAtom } from "@client/stores";
import { AppStorage } from "@client/utils";
import { useAtom } from "jotai";

export const useSavePathAtom = () => {
  const [savePath, _setSavePath] = useAtom(savePathAtom);
  const setSavePath = (newVal: string) => {
    AppStorage.setSavePath(newVal);
    _setSavePath(newVal);
  };
  return { savePath, setSavePath };
};
