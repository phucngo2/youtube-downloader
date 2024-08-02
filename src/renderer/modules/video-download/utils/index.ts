import { IVideoFormat } from "@server/types";

export const filterFormatList = (
  formatList: IVideoFormat[],
): IVideoFormat[] => {
  return formatList.filter(
    (item) => !!item.contentLength && item.audioBitrate !== undefined,
  );
};
