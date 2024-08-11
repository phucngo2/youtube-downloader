import { SectionTitle } from "@renderer/components";
import { useDownloadProgressListener } from "@renderer/modules/download-modal/hooks";
import { VideoDownloadTable } from "@renderer/modules/video-download/components";

export const VideoDownload = () => {
  useDownloadProgressListener();
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Encode & Download!</SectionTitle>
      <VideoDownloadTable />
    </div>
  );
};
