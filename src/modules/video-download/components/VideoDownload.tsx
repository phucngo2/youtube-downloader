import { SectionTitle } from "@client/components";
import { VideoDownloadTable } from "@client/modules/video-download/components";

export const VideoDownload = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Encode & Download!</SectionTitle>
      <VideoDownloadTable />
    </div>
  );
};
