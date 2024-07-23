import {
  DownloadModalControls,
  DownloadModalInfo,
  DownloadProgress,
} from "@client/modules/download-modal/components";
import { videoInfoAtom } from "@client/stores";
import { Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useAtomValue } from "jotai";

interface Props {}

export const DownloadModal = ({ context, id }: ContextModalProps<Props>) => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <div className="min-w-[480px] flex flex-col items-center gap-8 p-3">
      <Title order={3} className="text-center">
        {videoInfo?.title}
      </Title>
      <DownloadModalInfo />
      <DownloadProgress />
      <DownloadModalControls context={context} id={id} />
    </div>
  );
};
