import { IVideoInfo } from "@server/types";
import { atom } from "jotai";

export const videoInfoAtom = atom<IVideoInfo | null>(null);
