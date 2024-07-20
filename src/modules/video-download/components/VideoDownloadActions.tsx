import { ActionIcon, Group, rem, Tooltip } from "@mantine/core";
import { IconDownload, IconPlayerPlayFilled } from "@tabler/icons-react";

export const VideoDownloadActions = () => {
  return (
    <Group gap="xs" justify="center" wrap="nowrap">
      <Tooltip withArrow label="Download">
        <ActionIcon color="teal">
          <IconDownload style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Tooltip>
      <Tooltip withArrow label="Preview">
        <ActionIcon color="cyan">
          <IconPlayerPlayFilled style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
