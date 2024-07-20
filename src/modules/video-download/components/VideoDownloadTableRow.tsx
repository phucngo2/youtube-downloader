import { humanFileSize } from "@client/utils";
import { Table } from "@mantine/core";
import { IVideoFormat } from "@server/types";

interface Props {
  format: IVideoFormat;
}

export const VideoDownloadTableRow: React.FC<Props> = ({ format }) => {
  return (
    <Table.Tr key={format.itag}>
      <Table.Td>
        {format.hasAudio && !format.hasVideo
          ? `Audio - ${format.audioBitrate} kbps`
          : format.qualityLabel}
      </Table.Td>
      <Table.Td>
        {isNaN(Number(format.contentLength))
          ? ""
          : humanFileSize(Number(format.contentLength), true)}
      </Table.Td>
      <Table.Td>{format.container}</Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  );
};
