import {
  DownloadStatusEnum,
  IDownloadMessage,
  IDownloadResult,
} from "@server/types";
import { atom } from "jotai";

export interface IDownloadProgressAtom
  extends IDownloadMessage,
    IDownloadResult {}

export const downloadProgressAtomInitialValue: IDownloadProgressAtom = {
  downloaded: 0,
  total: 0,
  status: DownloadStatusEnum.Pending,
};

export const downloadProgressAtom = atom<IDownloadProgressAtom>(
  downloadProgressAtomInitialValue,
);
