import { Table } from "@mantine/core";

interface Props {
  rows: JSX.Element[];
}

export const VideoDownloadTable: React.FC<Props> = ({ rows }) => {
  return (
    <Table striped highlightOnHover stripedColor="dark">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Quality</Table.Th>
          <Table.Th className="text-center">Original Size</Table.Th>
          <Table.Th className="text-center">Original Container</Table.Th>
          <Table.Th className="text-center">Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
