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
