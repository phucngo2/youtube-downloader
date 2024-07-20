import { invokeOpenDirDialog } from "@client/modules/search-form/handlers";
import { useMutation } from "@tanstack/react-query";

export const useOpenDirDialogMutation = () => {
  return useMutation({
    mutationKey: ["open-dir-dialog"],
    mutationFn: () => {
      return invokeOpenDirDialog();
    },
  });
};
