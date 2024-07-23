import { useIpcListener } from "@client/hooks/use-ipc-listener";
import { downloadProgressAtom } from "@client/stores";
import {
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
} from "@server/config";
import { IDownloadMessage, IDownloadResult } from "@server/types";
import { IpcRendererEvent } from "electron";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

export const useDownloadProgressListener = () => {
  const _setDownloadProgress = useSetAtom(downloadProgressAtom);

  const handleDownloadProgress = useCallback(
    (_event: IpcRendererEvent, message: IDownloadMessage | IDownloadResult) =>
      _setDownloadProgress((state) => ({
        ...state,
        ...message,
      })),
    [_setDownloadProgress],
  );

  const handleDownloadResult = useCallback(
    (_event: IpcRendererEvent, message: IDownloadMessage | IDownloadResult) =>
      _setDownloadProgress((state) => ({
        ...state,
        ...message,
        downloaded: state.total,
      })),
    [_setDownloadProgress],
  );

  useIpcListener(EVENT_DOWNLOAD_VIDEO_PROGRESS, handleDownloadProgress);
  useIpcListener(EVENT_DOWNLOAD_VIDEO_RESULT, handleDownloadResult);
};
