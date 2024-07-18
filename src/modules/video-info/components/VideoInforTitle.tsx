import { Title } from "@mantine/core";

interface Props {
  children: React.ReactNode;
}

export const VideoInforTitle: React.FC<Props> = ({ children }) => {
  return <Title order={5}>🌠 {children}</Title>;
};
