import {
  VideoTagsCopy,
  VideoTagsEmpty,
} from "@client/modules/video-info/components";
import { videoInfoAtom } from "@client/stores";
import { Badge, Paper } from "@mantine/core";
import { useAtomValue } from "jotai";

export const VideoTags = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  if (!videoInfo?.keywords?.length) {
    return <VideoTagsEmpty />;
  }
  return (
    <div className="w-1/2">
      <Paper
        withBorder
        className="flex flex-row flex-wrap w-full gap-2 relative p-4 pb-[3.5rem]"
      >
        {videoInfo?.keywords.map((item) => (
          <Badge key={item} tt="none" variant="light">
            {item}
          </Badge>
        ))}
        <VideoTagsCopy />
      </Paper>
    </div>
  );
};
