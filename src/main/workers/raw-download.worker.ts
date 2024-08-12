import ytdl from "@distube/ytdl-core";
import fs from "node:fs";
import worker_threads from "node:worker_threads";
import {
  DownloadStatus,
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
  IRenderRequest,
} from "../types";
import { throttle } from "../utils";

const request: IRenderRequest = worker_threads.workerData;
const parentPort = worker_threads.parentPort;
try {
  let videoStream = ytdl(request.url, {
    quality: request.itag,
  });

  // Send current loading state to renderer
  videoStream.on(
    "progress",
    throttle((_: unknown, downloaded: number, total: number) => {
      let message: IDownloadMessage = {
        downloaded,
        total,
      };
      parentPort?.postMessage(message);
    }),
  );
  videoStream.pipe(fs.createWriteStream(request.savePath));

  videoStream.on("close", (code) => {
    let status: DownloadStatus =
      code === 0 ? DownloadStatusEnum.Success : DownloadStatusEnum.Failed;
    let result: IDownloadResult = {
      status,
    };
    parentPort?.postMessage(result);
  });
} catch (error) {
  parentPort?.postMessage({
    status: DownloadStatusEnum.Failed,
  });
}
