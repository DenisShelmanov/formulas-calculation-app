"use client";

import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type ReactQueryClientProviderProps = {
  children: ReactNode;
};

export const ReactQueryClientProvider: FC<ReactQueryClientProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
