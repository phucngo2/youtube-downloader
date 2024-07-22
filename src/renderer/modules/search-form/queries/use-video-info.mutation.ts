import { invokeSearchEvent } from "@client/modules/search-form/handlers";
import { useMutation } from "@tanstack/react-query";

export const useVideoInfoMutation = () => {
  return useMutation({
    mutationKey: ["video-info"],
    mutationFn: (searchValue: string) => {
      return invokeSearchEvent(searchValue);
    },
  });
};
