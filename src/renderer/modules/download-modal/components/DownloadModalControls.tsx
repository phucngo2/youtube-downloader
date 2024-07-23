import { DownloadModalControlsSuccess } from "@client/modules/download-modal/components";
import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import { Button, Group, rem } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { DownloadStatusEnum } from "@server/types";
import { IconX } from "@tabler/icons-react";

interface Props {
  context: ModalsContextProps;
  id: string;
}

export const DownloadModalControls: React.FC<Props> = ({ context, id }) => {
  const { downloadProgress } = useDownloadProgress();
  if (
    downloadProgress.status !== DownloadStatusEnum.Failed &&
    downloadProgress.status !== DownloadStatusEnum.Success
  )
    return <></>;
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
      <DownloadModalControlsSuccess />
    </Group>
  );
};
