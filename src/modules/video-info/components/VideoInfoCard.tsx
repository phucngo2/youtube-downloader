import { videoInfoAtom } from "@client/stores";
import { Card, Title } from "@mantine/core";
import { useAtomValue } from "jotai";

export const VideoInfoCard = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <Card
      shadow="xs"
      padding="lg"
      className="flex-1 overflow-y-auto scrollbar-stable bottom-container"
    >
      <Title order={5}>{videoInfo?.title}</Title>
    </Card>
  );
};
