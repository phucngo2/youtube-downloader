import { ISearchForm } from "@renderer/modules/search-form/types";
import { ActionIcon, CloseIcon, rem, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconSearch, IconSend } from "@tabler/icons-react";
import { useCallback, useState } from "react";

interface Props {
  form: UseFormReturnType<ISearchForm, (values: ISearchForm) => ISearchForm>;
}

export const InputSearch: React.FC<Props> = ({ form }) => {
  const [isDirty, setIsDirty] = useState(false);

  form.watch("keyword", (value) => {
    setIsDirty(value.dirty);
  });

  const resetField = useCallback(() => {
    form.setFieldValue("keyword", "");
  }, []);

  return (
    <TextInput
      className="w-1/2 min-w-60"
      placeholder="Paste video id or url here..."
      leftSection={
        isDirty ? (
          <CloseIcon
            size={rem(20)}
            aria-label="Clear input"
            className="cursor-pointer"
            onClick={resetField}
          />
        ) : (
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
          />
        )
      }
      rightSection={
        <ActionIcon type="submit" className="cursor-pointer">
          <IconSend style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
        </ActionIcon>
      }
      key={form.key("keyword")}
      {...form.getInputProps("keyword")}
    />
  );
};
