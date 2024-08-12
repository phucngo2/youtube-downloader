import { DownloadContainer } from "./download.types";

export interface IOpenDirDialogResult {
  canceled: boolean;
  filePath?: string;
}

export interface ISavePathRequest {
  savePath: string;
  videoTitle: string;
  container: DownloadContainer;
}
