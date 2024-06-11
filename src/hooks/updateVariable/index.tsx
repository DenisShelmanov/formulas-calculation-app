"use client";

import { QueriesKeys } from "@/constants";
import { Variable, VariableType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type UpdateVariableData = {
  type?: VariableType;
  name?: string;
  value?: number;
};

type UpdateMutationArgs = {
  id: string;
  data: UpdateVariableData;
};

export const useUpdateVariable = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, data }: UpdateMutationArgs) =>
      fetch(`/variables/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          client.refetchQueries({ queryKey: [QueriesKeys.FORMULAS] });
          client.setQueryData([QueriesKeys.VARIABLES, res.id], res);
          client.setQueryData([QueriesKeys.VARIABLES], (previous: any) =>
            previous.map((item: Variable) => (item.id === res.id ? res : item))
          );
        }),
  });

  return { ...mutation };
};
