import { Tabs } from "@mantine/core";
import { SectionTitle } from "@renderer/components";
import { useDownloadProgressListener } from "@renderer/modules/download-modal/hooks";
import {
  EncodedDownloadTable,
  RawDownloadTable,
} from "@renderer/modules/video-download/components";

export const VideoDownload = () => {
  useDownloadProgressListener();
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Encode & Download!</SectionTitle>
      <Tabs defaultValue="encoded">
        <Tabs.List>
          <Tabs.Tab value="encoded">Encoded Dowload</Tabs.Tab>
          <Tabs.Tab value="raw">Raw Dowload</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="encoded">
          <EncodedDownloadTable />
        </Tabs.Panel>

        <Tabs.Panel value="raw">
          <RawDownloadTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
