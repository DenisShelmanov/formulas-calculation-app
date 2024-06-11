"use client";

import { QueriesKeys } from "@/constants";
import { Formula } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useExpressionSearch = (searchQuery: string) => {
  const searchParam = new URLSearchParams({ query: searchQuery });
  const query = useQuery<unknown, unknown, Formula[]>({
    queryKey: [QueriesKeys.SEARCH, searchQuery],
    queryFn: () => fetch(`/search?${searchParam}`).then((res) => res.json()),
    enabled: !!searchQuery,
  });

  return query;
};
