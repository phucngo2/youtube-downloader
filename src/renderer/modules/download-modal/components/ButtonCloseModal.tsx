import { Button, rem } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface Props {
  handleClose: () => void;
  label?: string;
}

export const ButtonCloseModal: React.FC<Props> = ({ handleClose, label }) => {
  return (
    <Button
      leftSection={
        <IconX style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
      }
      color="gray"
      onClick={handleClose}
      variant="light"
    >
      {label || "Close modal"}
    </Button>
  );
};
