import path from "node:path";
import { FileExtensions, ISavePathRequest } from "../types";
import fs from "node:fs";

import pathToFfmpeg from "ffmpeg-static";
// Fix production issue of ffmpeg-static
const fixPath = (path: string) => path.replace("app.asar", "app.asar.unpacked");
export const getFfpmpegPath = (isPackaged: boolean) => {
  if (!pathToFfmpeg || !fs.existsSync(pathToFfmpeg)) {
    const message = "FFmpeg not found!";
    console.error(message);
    throw new Error(message);
  }
  if (!isPackaged) {
    return pathToFfmpeg;
  }
  return fixPath(pathToFfmpeg);
};

export const removeIllegalCharactersFromFilename = (filename: string) => {
  return filename.replace(/[/\\?%*:|"<>]/g, "-");
};

export const getSavePath = (
  request: ISavePathRequest,
  fileExtension: FileExtensions,
) => {
  if (request.savePath.endsWith(fileExtension)) {
    return request.savePath;
  }
  return path.join(
    request.savePath,
    `${removeIllegalCharactersFromFilename(request.videoTitle)}${fileExtension}`,
  );
};

export const getSavePathMp4 = (request: ISavePathRequest) => {
  return getSavePath(request, ".mp4");
};

export const getSavePathMp3 = (request: ISavePathRequest) => {
  return getSavePath(request, ".mp3");
};

export const getFolderPath = (filePath: string) => {
  let folderPathArr = filePath.split("\\");
  folderPathArr.pop();
  return folderPathArr.join("\\");
};
