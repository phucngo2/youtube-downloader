import { VideoContainer } from "./ytdl.types";

export type DownloadContainer = VideoContainer | "mp3";

export interface IDownloadRequest {
  url: string;
  itag: number;
  savePath: string;
  videoTitle: string;
  videoId: string;
  container: DownloadContainer;
}

export interface IRenderRequest extends IDownloadRequest {
  isPackaged: boolean;
}

export interface IDownloadMessage {
  downloaded: number;
  total: number;
}

export const DownloadStatusEnum = {
  Success: "Success",
  Failed: "Failed",
  Pending: "Pending",
  Downloading: "Downloading",
} as const;

export type DownloadStatus =
  (typeof DownloadStatusEnum)[keyof typeof DownloadStatusEnum];

export interface IDownloadResult {
  status: DownloadStatus;
  fullSavePath?: string;
  errorMessage?: string;
}

export interface IDownloadCancelRequest {
  videoId: string;
  itag: number;
}
