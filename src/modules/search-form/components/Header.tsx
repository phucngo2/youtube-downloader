import { SearchForm, Title } from "@client/modules/search-form/components";
import { Card } from "@mantine/core";

export const Header = () => {
  return (
    <Card
      shadow="xs"
      padding="lg"
      className="flex flex-col items-center justify-center gap-4 app-container top-container"
    >
      <Title />
      <SearchForm />
    </Card>
  );
};
