import { humanFileSize } from "@renderer/utils";
import { Group, Table } from "@mantine/core";
import { IVideoFormat } from "@main/types";
import { IconHeadphones, IconVideo } from "@tabler/icons-react";
import { VideoDownloadActions } from "@renderer/modules/video-download/components";

interface Props {
  videoFormat: IVideoFormat;
}

export const VideoDownloadTableRow: React.FC<Props> = ({ videoFormat }) => {
  const isAudio = videoFormat.hasAudio && !videoFormat.hasVideo;
  return (
    <Table.Tr key={videoFormat.itag}>
      <Table.Td className="font-semibold">
        {isAudio ? (
          <Group gap="xs" wrap="nowrap">
            <IconHeadphones />
            <span>{videoFormat.audioBitrate} kbps</span>
          </Group>
        ) : (
          <Group gap="xs" wrap="nowrap">
            <IconVideo />
            <span>{videoFormat.qualityLabel}</span>
          </Group>
        )}
      </Table.Td>
      <Table.Td className="text-center">
        {isNaN(Number(videoFormat.contentLength))
          ? ""
          : humanFileSize(Number(videoFormat.contentLength), true)}
      </Table.Td>
      <Table.Td className="text-center">.{videoFormat.container}</Table.Td>
      <Table.Td>
        <VideoDownloadActions isAudio={isAudio} videoFormat={videoFormat} />
      </Table.Td>
    </Table.Tr>
  );
};
