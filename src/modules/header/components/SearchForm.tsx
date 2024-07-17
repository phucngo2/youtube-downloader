import {
  InputFileLocation,
  InputSearch,
} from "@client/modules/header/components";
import { SEARCH_FORM_INITIAL_VALUES } from "@client/modules/header/config";
import { ISearchForm } from "@client/modules/header/types";
import { useForm } from "@mantine/form";

export const SearchForm = () => {
  const form = useForm<ISearchForm>({
    initialValues: SEARCH_FORM_INITIAL_VALUES,
  });

  const handleSubmit = (values: ISearchForm) => {
    console.log(values);
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
