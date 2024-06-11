"use client";

import { QueriesKeys } from "@/constants";
import { Formula } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetFormulaById = (id: string) => {
  const query = useQuery<unknown, unknown, Formula>({
    queryKey: [QueriesKeys.FORMULAS, id],
    queryFn: () =>
      fetch(`/formulas/${id}`, { method: "GET" }).then((res) => res.json()),
  });

  return query;
};
