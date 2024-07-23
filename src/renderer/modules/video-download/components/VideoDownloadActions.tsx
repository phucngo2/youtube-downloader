import { DownloadModal } from "@client/modules/download-modal/components";
import { sendDownloadVideoEvent } from "@client/modules/video-download/handlers";
import { savePathAtom, videoInfoAtom } from "@client/stores";
import { ActionIcon, Group, rem, Tooltip } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IVideoFormat } from "@server/types";
import { IconDownload, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useAtomValue } from "jotai";

interface Props {
  videoFormat: IVideoFormat;
}

export const VideoDownloadActions: React.FC<Props> = ({ videoFormat }) => {
  const videoInfo = useAtomValue(videoInfoAtom);
  const savePath = useAtomValue(savePathAtom);

  const openModal = () =>
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
      innerProps: {},
    });

  const handleDownload = () => {
    // sendDownloadVideoEvent({
    //   videoTitle: videoInfo!.title,
    //   itag: videoFormat.itag,
    //   url: videoInfo!.videoUrl,
    //   savePath,
    //   videoId: videoInfo!.videoId,
    // });
    openModal();
  };

  return (
    <Group gap="xs" justify="center" wrap="nowrap">
      <Tooltip withArrow label="Download" onClick={handleDownload}>
        <ActionIcon color="teal">
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
