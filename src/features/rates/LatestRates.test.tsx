import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/server";
import { LATEST_URL, latestRatesFixture } from "@/test/handlers";
import { renderWithProviders } from "@/test/utils";
import { LatestRates } from "./LatestRates";

describe("<LatestRates />", () => {
  it("shows a loading message first", () => {
    renderWithProviders(<LatestRates />);
    expect(screen.getByText("Loading rates...")).toBeInTheDocument();
  });

  it("shows the base currency, as-of date and each rate", async () => {
    renderWithProviders(<LatestRates />);

    expect(
      await screen.findByRole("heading", { name: "Latest Exchange Rates" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Base: EUR | As of: 2026-11-18")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("1.0968")).toBeInTheDocument();
    expect(screen.getByText("JPY")).toBeInTheDocument();
    expect(screen.getByText("174.8500")).toBeInTheDocument();
  });

  it("shows an empty message when the API returns no rates", async () => {
    server.use(
      http.get(LATEST_URL, () =>
        HttpResponse.json({ ...latestRatesFixture, rates: {} }),
      ),
    );

    renderWithProviders(<LatestRates />);

    expect(await screen.findByText("No rates available")).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    server.use(
      http.get(LATEST_URL, () => new HttpResponse(null, { status: 500 })),
    );

    renderWithProviders(<LatestRates />);

    expect(
      await screen.findByText("Error: Error fetching the latest rates!"),
    ).toBeInTheDocument();
  });
});
