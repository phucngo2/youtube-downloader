import { SectionTitle } from "@client/components";
import { useDownloadProgressListener } from "@client/modules/download-modal/hooks";
import { VideoDownloadTable } from "@client/modules/video-download/components";

export const VideoDownload = () => {
  useDownloadProgressListener();
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Encode & Download!</SectionTitle>
      <VideoDownloadTable />
    </div>
  );
};
