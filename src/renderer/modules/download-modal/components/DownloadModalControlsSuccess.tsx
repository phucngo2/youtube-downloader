import {
  invokeOpenFileLocationEvent,
  invokeOpenPathEvent,
} from "@client/modules/download-modal/handlers";
import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import { Button, rem } from "@mantine/core";
import { DownloadStatusEnum } from "@server/types";
import { IconFile, IconFolder } from "@tabler/icons-react";

export const DownloadModalControlsSuccess = () => {
  const { downloadProgress } = useDownloadProgress();

  if (
    downloadProgress.status !== DownloadStatusEnum.Success ||
    !downloadProgress.fullSavePath
  ) {
    return <></>;
  }

  const handleOpenFileLocation = () => {
    if (downloadProgress.fullSavePath) {
      invokeOpenFileLocationEvent(downloadProgress.fullSavePath);
    }
  };

  const handleOpenFile = () => {
    if (downloadProgress.fullSavePath) {
      invokeOpenPathEvent(downloadProgress.fullSavePath);
    }
  };

  return (
    <>
      <Button
        leftSection={
          <IconFolder
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
          />
        }
        onClick={handleOpenFileLocation}
      >
        Open File Location
      </Button>
      <Button
        leftSection={
          <IconFile style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
        }
        color="green"
        onClick={handleOpenFile}
      >
        Open File
      </Button>
    </>
  );
};
