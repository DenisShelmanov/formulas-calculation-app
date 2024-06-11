"use client";

import { QueriesKeys } from "@/constants";
import { Variable } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetVariables = () => {
  const query = useQuery<unknown, unknown, Variable[]>({
    queryKey: [QueriesKeys.VARIABLES],
    queryFn: () => fetch("/variables").then((res) => res.json()),
  });

  return query;
};
