import {
  VideoDownloadTable,
  VideoDownloadTableRow,
} from "@renderer/modules/video-download/components";
import { filterFormatList } from "@renderer/modules/video-download/utils";
import { videoInfoAtom } from "@renderer/stores";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

export const RawDownloadTable = () => {
  const videoInfo = useAtomValue(videoInfoAtom);

  const rows = useMemo(() => {
    return filterFormatList(videoInfo?.formats || []).map((format, index) => (
      <VideoDownloadTableRow
        key={`${index} - ${format.itag}`}
        videoFormat={format}
        isRaw
      />
    ));
  }, [videoInfo]);

  return (
    <div>
      <div className="mt-3 mb-5 text-justify">
        The download options below will provide the original media from YouTube.
      </div>
      <VideoDownloadTable rows={rows} />
    </div>
  );
};
