"use client";

import { QueriesKeys } from "@/constants";
import { VariableType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateFormulaData = {
  type?: VariableType;
  name?: string;
  state?: string;
};

type UpdateMutationArgs = {
  id: string;
  data: UpdateFormulaData;
};

export const useUpdateFormula = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateMutationArgs) =>
      fetch(`/formulas/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: [QueriesKeys.FORMULAS],
      }),
  });

  return { ...mutation };
};
