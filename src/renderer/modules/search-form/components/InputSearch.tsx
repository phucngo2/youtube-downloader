import { ISearchForm } from "@renderer/modules/search-form/types";
import { ActionIcon, rem, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconSearch, IconSend } from "@tabler/icons-react";

interface Props {
  form: UseFormReturnType<ISearchForm, (values: ISearchForm) => ISearchForm>;
}

export const InputSearch: React.FC<Props> = ({ form }) => {
  return (
    <TextInput
      className="w-1/2 min-w-60"
      placeholder="Paste video id or url here..."
      leftSection={
        <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
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
