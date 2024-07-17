import { Card } from "@mantine/core";
import "./App.css";
import { Layout } from "@client/components";
import { Header } from "@client/modules/search-form/components";

function App() {
  return (
    <Layout>
      <Header />
      <Card
        shadow="xs"
        padding="xl"
        className="flex flex-col items-center justify-center"
      >
        Hello Sekai
      </Card>
    </Layout>
  );
}

export default App;
