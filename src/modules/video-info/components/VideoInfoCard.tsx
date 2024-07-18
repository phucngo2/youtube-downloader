import { VideoDetail } from "@client/modules/video-info/components";
import { Card } from "@mantine/core";

export const VideoInfoCard = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      withBorder
      className="flex-1 gap-8 overflow-y-auto scrollbar-stable bottom-container"
    >
      <VideoDetail />
    </Card>
  );
};
