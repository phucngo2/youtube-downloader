import { STORAGE_KEY_SAVE_PATH } from "@client/config";

export const AppStorage = {
  setSavePath(savePath: string) {
    localStorage.setItem(STORAGE_KEY_SAVE_PATH, savePath);
  },
  getSavePath() {
    return localStorage.getItem(STORAGE_KEY_SAVE_PATH);
  },
};
