import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "@/app/router";
import type { ReactElement, ReactNode } from "react";

// A fresh QueryClient per test: no shared cache between tests, and no retries,
// so error states show up immediately instead of after a retry delay.
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

export function createWrapper() {
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: createWrapper(), ...options });
}

// Render the real app routes, starting at `path`, with a fresh query cache.
// createMemoryRouter keeps the URL in memory instead of the browser address bar,
// which jsdom does not really have.
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(<RouterProvider router={router} />, {
    wrapper: createWrapper(),
  });
}
