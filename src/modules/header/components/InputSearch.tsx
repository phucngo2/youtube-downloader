import { ActionIcon, rem, TextInput } from "@mantine/core";
import { IconSearch, IconSend } from "@tabler/icons-react";

export const InputSearch = () => {
  return (
    <TextInput
      w="50%"
      placeholder="Paste video id or url here..."
      leftSection={
        <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
      }
      rightSection={
        <ActionIcon className="cursor-pointer">
          <IconSend style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
        </ActionIcon>
      }
    />
  );
};
