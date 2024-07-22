import { SectionTitle } from "@client/components";
import { useIpcListener } from "@client/hooks/use-ipc-listener";
import { VideoDownloadTable } from "@client/modules/video-download/components";
import { EVENT_DOWNLOAD_VIDEO_PROGRESS } from "@server/config";

export const VideoDownload = () => {
  useIpcListener(EVENT_DOWNLOAD_VIDEO_PROGRESS, (_event, message) =>
    console.log(message),
  );
  return (
    <div className="flex flex-col w-full gap-3">
      <SectionTitle>Encode & Download!</SectionTitle>
      <VideoDownloadTable />
    </div>
  );
};
