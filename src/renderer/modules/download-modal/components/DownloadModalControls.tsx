import { Button, Group, rem } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { IconFile, IconFolder, IconX } from "@tabler/icons-react";

interface Props {
  context: ModalsContextProps;
  id: string;
}

export const DownloadModalControls: React.FC<Props> = ({ context, id }) => {
  return (
    <Group>
      <Button
        leftSection={
          <IconX style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
        }
        color="gray"
        onClick={() => context.closeModal(id)}
      >
        Close modal
      </Button>
      <Button
        leftSection={
          <IconFolder
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
          />
        }
        onClick={() => context.closeModal(id)}
      >
        Open File Location
      </Button>
      <Button
        leftSection={
          <IconFile style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
        }
        color="green"
        onClick={() => context.closeModal(id)}
      >
        Open File
      </Button>
    </Group>
  );
};
