export interface IOpenDirDialogResult {
  canceled: boolean;
  filePath?: string;
}

export interface ISavePathRequest {
  savePath: string;
  videoTitle: string;
}

export type FileExtensions = ".mp3" | ".mp4";
