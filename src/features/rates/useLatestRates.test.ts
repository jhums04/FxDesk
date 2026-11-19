import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/server";
import { LATEST_URL, latestRatesFixture } from "@/test/handlers";
import { createWrapper } from "@/test/utils";
import { useLatestRates } from "./useLatestRates";

describe("useLatestRates", () => {
  it("loads the latest rates", async () => {
    const { result } = renderHook(() => useLatestRates(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(latestRatesFixture);
  });

  it("exposes an error when the request fails", async () => {
    server.use(
      http.get(LATEST_URL, () => new HttpResponse(null, { status: 500 })),
    );

    const { result } = renderHook(() => useLatestRates(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe(
      "Error fetching the latest rates!",
    );
  });
});
