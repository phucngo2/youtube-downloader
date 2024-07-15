import { Card } from "@mantine/core";
import "./App.css";
import { Layout } from "@client/components";

function App() {
  return (
    <Layout>
      <Card
        shadow="xs"
        padding="xl"
        className="flex flex-col items-center justify-center"
      >
        Hello Sekai
      </Card>
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
