import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import { getDownloadProgressColor } from "@client/modules/download-modal/utils";
import { Progress } from "@mantine/core";
import { DownloadStatusEnum } from "@server/types";
import { useMemo } from "react";

export const DownloadProgress = () => {
  const { downloadProgress } = useDownloadProgress();

  const downloadPercent = useMemo(() => {
    if (!downloadProgress.total) return 0;
    return Math.round(
      (downloadProgress.downloaded / downloadProgress.total) * 100,
    );
  }, [downloadProgress]);

  return (
    <Progress.Root className="w-full" size="xl">
      <Progress.Section
        animated={downloadProgress.status == DownloadStatusEnum.Pending}
        value={downloadPercent}
        color={getDownloadProgressColor(downloadPercent)}
      >
        <Progress.Label>{downloadPercent}%</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};
