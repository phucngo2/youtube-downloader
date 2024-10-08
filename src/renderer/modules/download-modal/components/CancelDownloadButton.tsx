import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ButtonCloseModal } from "@renderer/modules/download-modal/components";
import { invokeCancelDownloadEvent } from "@renderer/modules/download-modal/handlers";
import { videoInfoAtom } from "@renderer/stores";
import { useAtomValue } from "jotai";

interface Props {
  handleClose: () => void;
  itag: number;
}

export const CancelDownloadButton: React.FC<Props> = ({
  handleClose,
  itag,
}) => {
  const videoInfo = useAtomValue(videoInfoAtom);
  const [opened, { open, close }] = useDisclosure(false);

  const handleConfirmCancelDownload = () => {
    if (videoInfo) {
      invokeCancelDownloadEvent({
        videoId: videoInfo.videoId,
        itag: itag,
      }).then(() => {
        close();
        handleClose();
      });
    }
  };
  return (
    <Group>
      <ButtonCloseModal handleClose={() => open()} label="Cancel" />
      <Modal
        zIndex={999}
        opened={opened}
        onClose={close}
        title={
          <div className="font-bold">
            Are you sure you want to cancel the download?
          </div>
        }
        centered
      >
        <Group justify="flex-end">
          <Button onClick={close} color="green">
            Continue the download!
          </Button>
          <Button onClick={handleConfirmCancelDownload} color="red">
            Cancel the download!
          </Button>
        </Group>
      </Modal>
    </Group>
  );
};
