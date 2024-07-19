import { Loader } from "@mantine/core";

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
      <Loader color="indigo" type="dots" />
    </div>
  );
};
