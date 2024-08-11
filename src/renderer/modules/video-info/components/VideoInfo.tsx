import {
  EmptyCard,
  VideoInfoCard,
} from "@renderer/modules/video-info/components";
import { videoInfoAtom } from "@renderer/stores";
import { useAtomValue } from "jotai";

export const VideoInfo = () => {
  const videoInfo = useAtomValue(videoInfoAtom);

  if (!videoInfo) {
    return <EmptyCard />;
  }

  return <VideoInfoCard />;
};
