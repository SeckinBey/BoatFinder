import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

/**
 * React Query hook'larını test etmek için wrapper
 */
export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Test'lerde retry'i kapat
        gcTime: 0, // Cache'i hemen temizle
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

/**
 * Hook'u React Query wrapper ile render eder
 */
export function renderHookWithQuery(renderHookFn, options = {}) {
  return renderHook(renderHookFn, {
    wrapper: createWrapper(),
    ...options,
  });
}
