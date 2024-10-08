import { LoadingScreen, ModalsProvider } from "@renderer/components";
import { theme } from "@renderer/config";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const queryClient = new QueryClient();

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <ModalsProvider>
          <Suspense fallback={<LoadingScreen />}>
            <App />
          </Suspense>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// Use contextBridge
window.electron.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
