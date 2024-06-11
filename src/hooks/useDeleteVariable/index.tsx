"use client";

import { QueriesKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteMutationArgs = {
  id: string;
};

export const useDeleteVariable = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }: DeleteMutationArgs) =>
      fetch(`/variables/${id}`, {
        method: "DELETE",
      }).then((res) => res.json()),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [QueriesKeys.VARIABLES] }),
  });

  return { ...mutation };
};
