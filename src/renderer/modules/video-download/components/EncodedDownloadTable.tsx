import {
  VideoDownloadTable,
  VideoDownloadTableRow,
} from "@renderer/modules/video-download/components";
import { filterFormatList } from "@renderer/modules/video-download/utils";
import { videoInfoAtom } from "@renderer/stores";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const EncodedDownloadTable = () => {
  const videoInfo = useAtomValue(videoInfoAtom);

  const rows = useMemo(() => {
    return filterFormatList(videoInfo?.formats || []).map((format, index) => (
      <VideoDownloadTableRow
        key={`${index} - ${format.itag}`}
        videoFormat={format}
      />
    ));
  }, [videoInfo]);

  return (
    <div>
      <div className="mt-3 mb-5 text-justify">
        YouTube separates video and audio to improve efficiency in media
        streaming. The download options below will encode the video to combine
        both the video and audio before downloading. This process may take a bit
        longer than usual, but the resulting video will have higher quality with
        audio included.
      </div>
      <VideoDownloadTable rows={rows} />
    </div>
  );
};
