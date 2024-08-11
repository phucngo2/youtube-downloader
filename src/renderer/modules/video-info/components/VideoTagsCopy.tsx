import { videoInfoAtom } from "@renderer/stores";
import { ActionIcon, rem, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useRef } from "react";

export const VideoTagsCopy = () => {
  const videoInfo = useAtomValue(videoInfoAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleCopyKeywords = useCallback(() => {
    navigator.clipboard.writeText(videoInfo?.keywords?.join(", ") || "");
    open();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(close, 1000);
  }, [videoInfo, open, close]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Tooltip
      label={opened ? "Keywords copied to clipboard!" : "Copy keywords..."}
      withArrow
      position="left"
    >
      <ActionIcon
        className="absolute bottom-[1rem] right-[1rem] rounded-full"
        onClick={handleCopyKeywords}
        color={opened ? "green" : ""}
      >
        {opened ? (
          <IconCopyCheckFilled style={{ width: rem(16), height: rem(16) }} />
        ) : (
          <IconCopy style={{ width: rem(16), height: rem(16) }} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
