import { Paper } from "@mantine/core";

export const VideoTagsEmpty = () => {
  return (
    <div className="w-1/2">
      <Paper p="md" withBorder className="w-full">
        No tag found... 🥲
      </Paper>
    </div>
  );
};
