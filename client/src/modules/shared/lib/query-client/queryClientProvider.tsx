"use client";

import { ReactNode } from "react";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClient } from "./queryClient";

export type QueryClientProviderProps = {
  children?: ReactNode;
};

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <ReactQueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    {children}
  </ReactQueryClientProvider>
);
