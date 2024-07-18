import { videoInfoAtom } from "@client/stores";
import { Badge, Paper } from "@mantine/core";
import { useAtomValue } from "jotai";

export const VideoTags = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <div className="w-1/2">
      <Paper
        p="md"
        withBorder
        className="flex flex-row flex-wrap w-full gap-2.5"
      >
        {videoInfo?.keywords?.map((item) => (
          <Badge key={item} tt="none" variant="light">
            {item}
          </Badge>
        ))}
      </Paper>
    </div>
  );
};
