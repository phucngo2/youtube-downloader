import { Layout } from "@client/components";
import { Header } from "@client/modules/search-form/components";
import { VideoInfo } from "@client/modules/video-info/components";
import "./App.css";

function App() {
  return (
    <Layout>
      <Header />
      <VideoInfo />
    </Layout>
  );
}

export default App;
