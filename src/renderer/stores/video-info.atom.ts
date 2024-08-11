import { IVideoInfo } from "@main/types";
import { atom } from "jotai";

export const videoInfoAtom = atom<IVideoInfo | null>(null);
