import { useDownloadProgress } from "@client/modules/download-modal/hooks";
import GifAquaCat from "@client/static/minato-aqua-hololive.gif";
import { humanFileSize } from "@client/utils";

export const DownloadModalInfo = () => {
  const { downloadProgress } = useDownloadProgress();
  return (
    <div className="flex flex-row items-center w-full gap-6 justify-evenly full">
      <img className="rounded" src={GifAquaCat} width={240} />
      {!!downloadProgress.total && (
        <div>
          <div className="font-semibold">Estimated file size:</div>
          <div>
            🚀 {humanFileSize(downloadProgress.downloaded)} /{" "}
            {humanFileSize(downloadProgress.total)} 🚀
          </div>
        </div>
      )}
    </div>
  );
};
