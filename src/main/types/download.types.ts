export interface IDownloadRequest {
  url: string;
  itag: number;
  savePath: string;
  videoTitle: string;
  videoId: string;
}

export interface IRenderRequest extends IDownloadRequest {
  isPackaged: boolean;
}

export interface IDownloadMessage {
  downloaded: number;
  total: number;
}

export interface IDownloadResult {
  isSuccess: boolean;
}
