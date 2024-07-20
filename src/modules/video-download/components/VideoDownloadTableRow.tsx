import { humanFileSize } from "@client/utils";
import { Group, Table } from "@mantine/core";
import { IVideoFormat } from "@server/types";
import { IconHeadphones, IconVideo } from "@tabler/icons-react";
import { VideoDownloadActions } from "./VideoDownloadActions";

interface Props {
  format: IVideoFormat;
}

export const VideoDownloadTableRow: React.FC<Props> = ({ format }) => {
  const isAudio = format.hasAudio && !format.hasVideo;
  return (
    <Table.Tr key={format.itag}>
      <Table.Td className="font-semibold">
        {isAudio ? (
          <Group gap="xs" wrap="nowrap">
            <IconHeadphones />
            <span>{format.audioBitrate} kbps</span>
          </Group>
        ) : (
          <Group gap="xs" wrap="nowrap">
            <IconVideo />
            <span>{format.qualityLabel}</span>
          </Group>
        )}
      </Table.Td>
      <Table.Td className="text-center">
        {isNaN(Number(format.contentLength))
          ? ""
          : humanFileSize(Number(format.contentLength), true)}
      </Table.Td>
      <Table.Td className="text-center">.{format.container}</Table.Td>
      <Table.Td>
        <VideoDownloadActions />
      </Table.Td>
    </Table.Tr>
  );
};
