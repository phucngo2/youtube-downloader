import {
  VideoInforTitle,
  VideoPlayer,
  VideoTags,
} from "@client/modules/video-info/components";
import { videoInfoAtom } from "@client/stores";
import { useAtomValue } from "jotai";

export const VideoDetail = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <div className="flex flex-col w-full gap-4">
      <VideoInforTitle>{videoInfo?.title}</VideoInforTitle>
      <div className="flex flex-row items-start w-full gap-4 items-between">
        <VideoPlayer />
        <VideoTags />
      </div>
    </div>
  );
};
