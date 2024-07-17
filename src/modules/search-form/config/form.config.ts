import { FormMode } from "node_modules/@mantine/form/lib/types";

export const SEARCH_FORM_INITIAL_VALUES = {
  keyword: "",
};

export const SEARCH_FORM_CONFIG = {
  mode: "uncontrolled" as FormMode,
  initialValues: SEARCH_FORM_INITIAL_VALUES,
  validate: {
    keyword: (value: string) =>
      !value.trim() ? "Please enter a video id or url" : null,
  },
};
