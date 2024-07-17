import { SearchForm, Title } from "@client/modules/header/components";
import { Card } from "@mantine/core";

export const Header = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      className="flex flex-col items-center justify-center gap-4"
    >
      <Title />
      <SearchForm />
    </Card>
  );
};
