import {
  DownloadModalControls,
  DownloadProgress,
} from "@client/modules/download-modal/components";
import { videoInfoAtom } from "@client/stores";
import { Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useAtomValue } from "jotai";
import GifAquaCat from "@client/static/minato-aqua-hololive.gif";

interface Props {}

export const DownloadModal = ({ context, id }: ContextModalProps<Props>) => {
  const videoInfo = useAtomValue(videoInfoAtom);
  return (
    <div className="min-w-[480px] flex flex-col items-center gap-8 p-3">
      <Title order={3} className="text-center">
        {videoInfo?.title}
      </Title>
      <div className="flex flex-row items-center w-full gap-6 justify-evenly full">
        <img className="rounded" src={GifAquaCat} width={240} />
        <div>
          <div className="font-semibold">Estimated file size:</div>
          <div>🚀 100 MB / 200 MB 🚀</div>
        </div>
      </div>
      <DownloadProgress />
      <DownloadModalControls context={context} id={id} />
    </div>
  );
};
