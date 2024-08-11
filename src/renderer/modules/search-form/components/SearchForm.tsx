import {
  InputFileLocation,
  InputSearch,
} from "@renderer/modules/search-form/components";
import { SEARCH_FORM_CONFIG } from "@renderer/modules/search-form/config";
import {
  useOpenDirDialogMutation,
  useVideoInfoMutation,
} from "@renderer/modules/search-form/queries";
import { ISearchForm } from "@renderer/modules/search-form/types";
import { videoInfoAtom } from "@renderer/stores";
import { LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSetAtom } from "jotai";

export const SearchForm = () => {
  const setVideoInfo = useSetAtom(videoInfoAtom);
  const form = useForm<ISearchForm>(SEARCH_FORM_CONFIG);
  // Submit search form
  const { mutateAsync, isPending: videoInfoPending } = useVideoInfoMutation();
  // Change save file location
  const {
    mutateAsync: openDirDialogMutateAsync,
    isPending: openDirDialogPending,
  } = useOpenDirDialogMutation();

  const handleSubmit = async (values: ISearchForm) => {
    const res = await mutateAsync(values.keyword);
    setVideoInfo(res);
  };

  const isPending = videoInfoPending || openDirDialogPending;
  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay
        loaderProps={{
          type: "dots",
        }}
        visible={isPending}
      />
      <InputSearch form={form} />
      <InputFileLocation mutateAsync={openDirDialogMutateAsync} />
    </form>
  );
};
