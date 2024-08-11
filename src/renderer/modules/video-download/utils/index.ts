import { IVideoFormat } from "@main/types";

export const filterFormatList = (
  formatList: IVideoFormat[],
): IVideoFormat[] => {
  return removeDuplicatedItags(formatList).filter(
    (item) => !!item.contentLength && item.audioBitrate !== undefined,
  );
};

function removeDuplicatedItags(formats: IVideoFormat[]): IVideoFormat[] {
  const uniqueFormats = new Map<number, IVideoFormat>();

  for (let format of formats) {
    if (!uniqueFormats.has(format.itag)) {
      uniqueFormats.set(format.itag, format);
    }
  }

  return Array.from(uniqueFormats.values());
}
