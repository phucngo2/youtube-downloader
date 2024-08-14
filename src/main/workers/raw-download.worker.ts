import ytdl from "@distube/ytdl-core";
import fs from "node:fs";
import worker_threads from "node:worker_threads";
import { DownloadStatusEnum, IDownloadMessage, IRenderRequest } from "../types";
import { throttle } from "../utils";

const request: IRenderRequest = worker_threads.workerData;
const parentPort = worker_threads.parentPort;
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

videoStream.on("end", () => {
  parentPort?.postMessage({
    status: DownloadStatusEnum.Success,
    fullSavePath: request.savePath,
  });
});

videoStream.on("error", () => {
  parentPort?.postMessage({
    status: DownloadStatusEnum.Failed,
  });
});
