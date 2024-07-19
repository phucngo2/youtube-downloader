import { invokeSavePathEvent } from "@client/modules/search-form/handlers";
import { useQuery } from "@tanstack/react-query";

export const useSavePathQuery = () => {
  return useQuery({
    queryKey: ["save-path"],
    queryFn: () => {
      return invokeSavePathEvent();
    },
  });
};
