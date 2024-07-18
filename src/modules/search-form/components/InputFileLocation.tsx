import { ActionIcon, rem, TextInput, Tooltip } from "@mantine/core";
import { IconDownload, IconPaperclip } from "@tabler/icons-react";

export const InputFileLocation = () => {
  return (
    <Tooltip position="bottom" withArrow label="Change file save location">
      <TextInput
        placeholder="Paste video id or url here..."
        readOnly
        className="w-1/2 cursor-pointer min-w-60"
        styles={{
          input: {
            cursor: "pointer",
          },
        }}
        leftSection={
          <IconPaperclip
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
          />
        }
        rightSection={
          <ActionIcon color="violet" className="cursor-pointer">
            <IconDownload
              style={{ width: rem(16), height: rem(16) }}
              stroke={2.5}
            />
          </ActionIcon>
        }
      />
    </Tooltip>
  );
};
