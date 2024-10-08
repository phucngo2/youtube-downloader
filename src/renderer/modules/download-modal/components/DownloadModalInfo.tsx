import { useDownloadProgress } from "@renderer/modules/download-modal/hooks";
import GifAquaCat from "@renderer/static/minato-aqua-hololive.gif";
import { humanFileSize } from "@renderer/utils";
import { Alert } from "@mantine/core";
import { DownloadStatusEnum } from "@main/types";
import { IconExclamationCircle } from "@tabler/icons-react";
import ImgYouDeer from "@renderer/static/you-deer.jpg";

export const DownloadModalInfo = () => {
  const { downloadProgress } = useDownloadProgress();
  let isDownloadFailed = downloadProgress.status == DownloadStatusEnum.Failed;
  return (
    <div className="flex flex-row items-center w-full gap-6 justify-evenly full">
      <img
        className="rounded"
        src={isDownloadFailed ? ImgYouDeer : GifAquaCat}
        width={240}
      />
      {isDownloadFailed ? (
        <Alert
          variant="light"
          color="red"
          title="Download failed 🥲"
          icon={<IconExclamationCircle />}
          mah={135}
          className="overflow-auto"
        >
          {downloadProgress.errorMessage || "Something went wrong!"}
        </Alert>
      ) : (
        !!downloadProgress.total && (
          <div>
            <div className="font-semibold">Estimated file size:</div>
            <div>
              🚀 {humanFileSize(downloadProgress.downloaded)} /{" "}
              {humanFileSize(downloadProgress.total)} 🚀
            </div>
          </div>
        )
      )}
    </div>
  );
};
