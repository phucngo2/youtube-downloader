import {
  VideoInfoTitle,
  VideoPlayer,
  VideoTags,
} from "@client/modules/video-info/components";

export const VideoDetail = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <VideoInfoTitle>Video Information</VideoInfoTitle>
      <div className="flex flex-row items-start w-full gap-4 items-between">
        <VideoPlayer />
        <VideoTags />
      </div>
    </div>
  );
};
