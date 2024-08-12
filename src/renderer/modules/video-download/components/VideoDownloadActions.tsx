import { useDownloadProgress } from "@renderer/modules/download-modal/hooks";
import {
  sendDownloadAudioEvent,
  sendDownloadVideoEvent,
} from "@renderer/modules/video-download/handlers";
import { savePathAtom, videoInfoAtom } from "@renderer/stores";
import { ActionIcon, Group, rem, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IVideoFormat } from "@main/types";
import { IconDownload, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { AUDIO_CONTAINER } from "@main/config";

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
        closeOnEscape: false,
        closeOnClickOutside: false,
        withCloseButton: false,
        // Modal location & size
        centered: true,
        size: "lg",
        // Props
        innerProps: {
          itag: videoFormat.itag,
        },
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
      container: isAudio ? AUDIO_CONTAINER : videoFormat.container,
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
