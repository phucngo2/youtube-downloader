import { Layout } from "@renderer/components";
import { Header } from "@renderer/modules/search-form/components";
import { VideoInfo } from "@renderer/modules/video-info/components";
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
