import {
  InputFileLocation,
  InputSearch,
} from "@client/modules/search-form/components";
import { SEARCH_FORM_CONFIG } from "@client/modules/search-form/config";
import { useVideoInfoMutation } from "@client/modules/search-form/queries";
import { ISearchForm } from "@client/modules/search-form/types";
import { LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";

export const SearchForm = () => {
  const form = useForm<ISearchForm>(SEARCH_FORM_CONFIG);
  const { mutateAsync, isPending } = useVideoInfoMutation();

  const handleSubmit = async (values: ISearchForm) => {
    const res = await mutateAsync(values.keyword);
    console.log(res);
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay visible={isPending} />
      <InputSearch form={form} />
      <InputFileLocation />
    </form>
  );
};
