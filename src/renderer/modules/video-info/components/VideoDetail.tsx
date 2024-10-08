import { SectionTitle } from "@renderer/components";
import {
  VideoPlayer,
  VideoTags,
} from "@renderer/modules/video-info/components";

export const VideoDetail = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Video Information</SectionTitle>
      <div className="flex flex-row items-start w-full gap-4 items-between">
        <VideoPlayer />
        <VideoTags />
      </div>
    </div>
  );
};
