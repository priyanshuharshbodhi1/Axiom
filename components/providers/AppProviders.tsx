"use client";

import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextTopLoader from "nextjs-toploader";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#800080" showSpinner={false} />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
