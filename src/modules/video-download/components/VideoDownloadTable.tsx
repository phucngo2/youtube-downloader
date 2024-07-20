import { VideoDownloadTableRow } from "@client/modules/video-download/components";
import { filterFormatList } from "@client/modules/video-download/utils";
import { videoInfoAtom } from "@client/stores";
import { Table } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const VideoDownloadTable = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  console.log(videoInfo?.formats);

  const rows = useMemo(() => {
    return filterFormatList(videoInfo?.formats || []).map((format) => (
      <VideoDownloadTableRow key={format.itag} format={format} />
    ));
  }, [videoInfo]);

  return (
    <Table striped highlightOnHover stripedColor="dark">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Quality</Table.Th>
          <Table.Th>Original Size</Table.Th>
          <Table.Th>Original Container</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
