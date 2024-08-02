import ImgYoutubeIcon from "@client/static/youtube_icon.png";
import { Title as MantineTitle } from "@mantine/core";

export const Title = () => {
  return (
    <MantineTitle order={2} mb={4} className="flex flex-row items-center gap-3">
      <img src={ImgYoutubeIcon} height={24} width={24} />
      YouTube Downloader
    </MantineTitle>
  );
};
