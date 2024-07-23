import { Button, rem } from "@mantine/core";
import { DownloadStatusEnum } from "@server/types";
import { IconFile, IconFolder } from "@tabler/icons-react";
import { useDownloadProgress } from "../hooks";

export const DownloadModalControlsSuccess = () => {
  const { downloadProgress } = useDownloadProgress();
  if (
    downloadProgress.status === DownloadStatusEnum.Success &&
    !!downloadProgress.fullSavePath
  ) {
    return (
      <>
        <Button
          leftSection={
            <IconFolder
              style={{ width: rem(16), height: rem(16) }}
              stroke={2.5}
            />
          }
        >
          Open File Location
        </Button>
        <Button
          leftSection={
            <IconFile
              style={{ width: rem(16), height: rem(16) }}
              stroke={2.5}
            />
          }
          color="green"
        >
          Open File
        </Button>
      </>
    );
  }
  return <></>;
};
