import { useIpcListener } from "@renderer/hooks/use-ipc-listener";
import { downloadProgressAtom } from "@renderer/stores";
import {
  EVENT_DOWNLOAD_VIDEO_PROGRESS,
  EVENT_DOWNLOAD_VIDEO_RESULT,
  EVENT_DOWNLOADING,
} from "@main/config";
import {
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
} from "@main/types";
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

  const handleStartDownloading = useCallback(
    (_event: IpcRendererEvent) =>
      _setDownloadProgress((state) => ({
        ...state,
        status: DownloadStatusEnum.Downloading,
      })),
    [_setDownloadProgress],
  );

  useIpcListener(EVENT_DOWNLOAD_VIDEO_PROGRESS, handleDownloadProgress);
  useIpcListener(EVENT_DOWNLOAD_VIDEO_RESULT, handleDownloadResult);
  useIpcListener(EVENT_DOWNLOADING, handleStartDownloading);
};
