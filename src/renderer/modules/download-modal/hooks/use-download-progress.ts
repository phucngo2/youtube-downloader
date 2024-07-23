import {
  downloadProgressAtom,
  downloadProgressAtomInitialValue,
} from "@client/stores";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useDownloadProgress = () => {
  const [downloadProgress, setDownloadProgress] = useAtom(downloadProgressAtom);

  const clearProgress = useCallback(() => {
    setDownloadProgress(downloadProgressAtomInitialValue);
  }, [setDownloadProgress]);

  return {
    downloadProgress,
    setDownloadProgress,
    clearProgress,
  };
};