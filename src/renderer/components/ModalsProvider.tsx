import { DownloadModal } from "@client/modules/download-modal/components";
import { ModalsProvider as MaintineModalsProvider } from "@mantine/modals";

interface Props {
  children: React.ReactNode;
}

export const ModalsProvider: React.FC<Props> = ({ children }) => {
  return (
    <MaintineModalsProvider modals={{ downloadModal: DownloadModal }}>
      {children}
    </MaintineModalsProvider>
  );
};
