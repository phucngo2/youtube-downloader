import { useSavePathAtom } from "@renderer/modules/search-form/hooks";
import { ActionIcon, rem, TextInput, Tooltip } from "@mantine/core";
import { IOpenDirDialogResult } from "@main/types";
import { IconDownload, IconPaperclip } from "@tabler/icons-react";

interface Props {
  mutateAsync: () => Promise<IOpenDirDialogResult>;
}

export const InputFileLocation: React.FC<Props> = ({ mutateAsync }) => {
  const { savePath, setSavePath } = useSavePathAtom();

  const handleChangeSavePathClick = async () => {
    const res = await mutateAsync();
    if (res.canceled || !res.filePath) {
      return;
    }
    setSavePath(res.filePath);
  };

  return (
    <TextInput
      placeholder="Paste video id or url here..."
      readOnly
      className="w-1/2 cursor-pointer min-w-60"
      value={savePath}
      leftSection={
        <IconPaperclip
          style={{ width: rem(16), height: rem(16) }}
          stroke={2.5}
        />
      }
      rightSection={
        <Tooltip position="bottom" withArrow label="Change file save location">
          <ActionIcon
            color="violet"
            className="cursor-pointer"
            onClick={handleChangeSavePathClick}
          >
            <IconDownload
              style={{ width: rem(16), height: rem(16) }}
              stroke={2.5}
            />
          </ActionIcon>
        </Tooltip>
      }
    />
  );
};
