import {
  ButtonCloseModal,
  CancelDownloadButton,
  DownloadModalControlsSuccess,
} from "@renderer/modules/download-modal/components";
import { useDownloadProgress } from "@renderer/modules/download-modal/hooks";
import { Group } from "@mantine/core";
import { ModalsContextProps } from "@mantine/modals/lib/context";
import { DownloadStatusEnum } from "@main/types";

interface Props {
  context: ModalsContextProps;
  id: string;
  itag: number;
}

export const DownloadModalControls: React.FC<Props> = ({
  context,
  id,
  itag,
}) => {
  const { downloadProgress } = useDownloadProgress();

  const handleClose = () => {
    context.closeModal(id);
  };

  switch (downloadProgress.status) {
    case DownloadStatusEnum.Pending: {
      return <></>;
    }

    case DownloadStatusEnum.Downloading: {
      return <CancelDownloadButton handleClose={handleClose} itag={itag} />;
    }

    default: {
      return (
        <Group>
          <ButtonCloseModal handleClose={handleClose} />
          <DownloadModalControlsSuccess />
        </Group>
      );
    }
  }
};
