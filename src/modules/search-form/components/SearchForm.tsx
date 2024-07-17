import {
  InputFileLocation,
  InputSearch,
} from "@client/modules/search-form/components";
import { SEARCH_FORM_CONFIG } from "@client/modules/search-form/config";
import { sendSearchEvent } from "@client/modules/search-form/handlers";
import { ISearchForm } from "@client/modules/search-form/types";
import { useForm } from "@mantine/form";

export const SearchForm = () => {
  const form = useForm<ISearchForm>(SEARCH_FORM_CONFIG);

  const handleSubmit = (values: ISearchForm) => {
    sendSearchEvent(values.keyword);
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-4"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <InputSearch form={form} />
      <InputFileLocation />
    </form>
  );
};
