import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import { getDownloadProgressColor } from "@client/modules/download-modal/utils";
import { Progress } from "@mantine/core";
import { useMemo } from "react";

export const DownloadProgress = () => {
  const { downloadProgress } = useDownloadProgress();

  const downloadPercent = useMemo(() => {
    if (!downloadProgress.total) return 0;
    return downloadProgress.downloaded / downloadProgress.total;
  }, [downloadProgress]);

  return (
    <Progress.Root className="w-full" size="xl">
      <Progress.Section
        animated
        value={downloadPercent}
        color={getDownloadProgressColor(downloadPercent)}
      >
        <Progress.Label>{downloadPercent}%</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};
