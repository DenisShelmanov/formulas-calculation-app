"use client";

import { MutationsKeys, QueriesKeys } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateFormulaData = {
  name?: string;
  value?: number;
  state?: string;
};

export const useAddFormula = () => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationKey: [MutationsKeys.ADD_FORMULA],
    mutationFn: (data: CreateFormulaData) =>
      fetch("/formulas", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [QueriesKeys.FORMULAS] }),
  });

  const addDefaultFormula = () =>
    mutation.mutate({
      name: "New formula",
      value: 0,
      state: "",
    });

  return { ...mutation, addDefaultFormula };
};
