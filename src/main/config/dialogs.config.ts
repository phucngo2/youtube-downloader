export const MessageBoxCloseConfig: Electron.MessageBoxSyncOptions = {
  type: "question",
  buttons: ["Yes", "No"],
  title: "Confirm",
  message: "Are you sure you want to cancel the current download and quit?",
} as const;
