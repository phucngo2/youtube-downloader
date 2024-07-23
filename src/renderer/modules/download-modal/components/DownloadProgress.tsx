import { Progress } from "@mantine/core";
import { getDownloadProgressColor } from "../utils";

export const DownloadProgress = () => {
  let downloaded = 0;
  let total = 0;
  return (
    <Progress.Root className="w-full" size="xl">
      <Progress.Section
        animated
        value={100}
        color={getDownloadProgressColor(downloaded, total)}
      >
        <Progress.Label>100%</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
};
