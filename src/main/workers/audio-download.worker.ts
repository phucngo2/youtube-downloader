import ytdl from "@distube/ytdl-core";
import childProcess from "node:child_process";
import worker_threads from "node:worker_threads";
import { Writable } from "stream";
import {
  DownloadStatus,
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
  IRenderRequest,
} from "../types";
import { getFfpmpegPath, getSavePathMp3, throttle } from "../utils";

const request: IRenderRequest = worker_threads.workerData;
const parentPort = worker_threads.parentPort;

const pathToFfmpeg = getFfpmpegPath(request.isPackaged);

let audioStream = ytdl(request.url, {
  quality: request.itag,
});

let fullSavePath = getSavePathMp3(request);

// Send current loading state to renderer
audioStream.on(
  "progress",
  throttle((_: unknown, downloaded: number, total: number) => {
    let message: IDownloadMessage = {
      downloaded,
      total,
    };
    parentPort?.postMessage(message);
  }),
);

const ffmpegProcess = childProcess.spawn(
  pathToFfmpeg,
  [
    // Remove ffmpeg's console spamming
    "-loglevel",
    "8",
    "-hide_banner",
    // Redirect/Enable progress messages
    //"-progress",
    //"pipe:2",
    // Set inputs
    "-i",
    "pipe:3",
    // Keep encoding
    "-c:v",
    "copy",
    // Override existing file
    "-y",
    // Define output file
    fullSavePath,
  ],
  {
    windowsHide: true,
    stdio: [
      /* Standard: stdin, stdout, stderr */
      "inherit",
      "inherit",
      "inherit",
      /* Custom: pipe:3, pipe:4 */
      "pipe",
      "pipe",
    ],
  },
);

audioStream.pipe(ffmpegProcess.stdio[3] as Writable);

// On close ffmpeg process
ffmpegProcess.on("close", (code) => {
  let status: DownloadStatus =
    code === 0 ? DownloadStatusEnum.Success : DownloadStatusEnum.Failed;
  let result: IDownloadResult = {
    status,
    fullSavePath,
  };
  parentPort?.postMessage(result);
});
