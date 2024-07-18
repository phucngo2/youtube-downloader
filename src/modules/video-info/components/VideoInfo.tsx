import { videoInfoAtom } from "@client/stores";
import { Card, Title } from "@mantine/core";
import { useAtomValue } from "jotai";

export const VideoInfo = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <Card shadow="xs" padding="lg" className="flex-1 overflow-y-auto">
      <Title order={5}>{videoInfo?.title}</Title>
    </Card>
  );
};
