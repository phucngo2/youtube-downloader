import {
  EmptyCard,
  VideoInfoCard,
} from "@client/modules/video-info/components";
import { videoInfoAtom } from "@client/stores";
import { useAtomValue } from "jotai";

export const VideoInfo = () => {
  const videoInfo = useAtomValue(videoInfoAtom);

  if (!videoInfo) {
    return <EmptyCard />;
  }

  return <VideoInfoCard />;
};
