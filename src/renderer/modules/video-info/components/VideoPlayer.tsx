import { videoInfoAtom } from "@renderer/stores";
import { Title } from "@mantine/core";
import { useAtomValue } from "jotai";

export const VideoPlayer = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <div className="w-1/2 rounded position-relative aspect-video">
      <iframe
        className="top-0 bottom-0 left-0 right-0 w-full h-full rounded position-absolute"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={videoInfo?.embedUrl}
      ></iframe>
      <Title order={5} mt={8}>
        {videoInfo?.title}
      </Title>
    </div>
  );
};
