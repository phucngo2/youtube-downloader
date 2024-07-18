import { Title } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

export const VideoInfoTitle: React.FC<Props> = ({ children }) => {
  return <Title order={4}>🌠 {children}</Title>;
};
