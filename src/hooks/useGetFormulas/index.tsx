"use client";

import { QueriesKeys } from "@/constants";
import { Formula } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetFormulas = () => {
  const query = useQuery<unknown, unknown, Formula[]>({
    queryKey: [QueriesKeys.FORMULAS],
    queryFn: () => fetch("/formulas").then((res) => res.json()),
  });

  return query;
};
