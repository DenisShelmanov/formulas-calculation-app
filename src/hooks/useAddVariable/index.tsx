"use client";

import { MutationsKeys, QueriesKeys } from "@/constants";
import { VariableType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateVariableData = {
  type: VariableType;
  name?: string;
  value?: number;
};

export const useAddVariable = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: [MutationsKeys.ADD_VARIABLE],
    mutationFn: (data: CreateVariableData) =>
      fetch("/variables", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [QueriesKeys.VARIABLES] }),
  });

  const addDefaultVariable = (type?: VariableType) =>
    mutation.mutate({
      type: type || VariableType.NUMBER,
      name: "New variable",
      value: 0,
    });

  return { ...mutation, addDefaultVariable };
};
