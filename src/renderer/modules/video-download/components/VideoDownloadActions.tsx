import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import {
  sendDownloadAudioEvent,
  sendDownloadVideoEvent,
} from "@client/modules/video-download/handlers";
import { savePathAtom, videoInfoAtom } from "@client/stores";
import { ActionIcon, Group, rem, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IVideoFormat } from "@server/types";
import { IconDownload, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

interface Props {
  videoFormat: IVideoFormat;
  isAudio: boolean;
}

export const VideoDownloadActions: React.FC<Props> = ({
  videoFormat,
  isAudio,
}) => {
  const videoInfo = useAtomValue(videoInfoAtom);
  const savePath = useAtomValue(savePathAtom);
  const { clearProgress } = useDownloadProgress();

  const openModal = useCallback(
    () =>
      modals.openContextModal({
        modal: "downloadModal",
        // Unclosable
        // closeOnEscape: false,
        closeOnClickOutside: false,
        withCloseButton: false,
        // Modal location & size
        centered: true,
        size: "lg",
        // Props
        innerProps: {},
      }),
    [],
  );

  const handleDownload = () => {
    let data = {
      videoTitle: videoInfo!.title,
      itag: videoFormat.itag,
      url: videoInfo!.videoUrl,
      savePath,
      videoId: videoInfo!.videoId,
    };
    if (isAudio) {
      sendDownloadAudioEvent(data);
    } else {
      sendDownloadVideoEvent(data);
    }
    clearProgress();
    openModal();
  };

  return (
    <Group gap="xs" justify="center" wrap="nowrap">
      <Tooltip withArrow label="Download">
        <ActionIcon color="teal" onClick={handleDownload}>
          <IconDownload style={{ width: rem(16), height: rem(16) }} />
        </ActionIcon>
      </Tooltip>
      {!!videoFormat.url && (
        <Tooltip withArrow label="Preview">
          <ActionIcon
            color="cyan"
            component="a"
            href={videoFormat.url}
            rel="noreferrer"
            target="_blank"
          >
            <IconPlayerPlayFilled style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Tooltip>
      )}
    </Group>
  );
};
