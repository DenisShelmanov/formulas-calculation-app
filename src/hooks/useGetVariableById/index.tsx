"use client";

import { QueriesKeys } from "@/constants";
import { Variable } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetVariableById = (id: string) => {
  const query = useQuery<unknown, unknown, Variable>({
    queryKey: [QueriesKeys.VARIABLES, id],
    queryFn: () =>
      fetch(`/variables/${id}`, { method: "GET" }).then((res) => res.json()),
  });

  return query;
};
