import { Title as MantineTitle } from "@mantine/core";

export const Title = () => {
  return (
    <MantineTitle order={2} mb={4} className="flex flex-row items-center gap-3">
      <img src="/youtube_icon.png" height={24} width={24} />
      Youtube video stalker
    </MantineTitle>
  );
};
