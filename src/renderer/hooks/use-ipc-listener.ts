import { IpcRendererListener } from "@electron-toolkit/preload";
import { useEffect, useRef } from "react";

export const useIpcListener = (
  channel: string,
  listener: IpcRendererListener,
) => {
  const savedHandler = useRef<IpcRendererListener>();
  useEffect(() => {
    savedHandler.current = listener;
  }, [listener]);
  useEffect(() => {
    if (!window.electron.ipcRenderer)
      throw new Error(
        "electron-use-ipc-listener: Use useIpcListener in the Renderer process only",
      );
    const eventHandler = (event, ...rest) =>
      savedHandler.current?.(event, ...rest);
    window.electron.ipcRenderer.on(channel, eventHandler);
    return () => {
      window.electron.ipcRenderer.removeAllListeners(channel);
    };
  }, [channel]);
};
