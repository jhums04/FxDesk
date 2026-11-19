import { http, HttpResponse } from "msw";

// Captured from a real call to https://api.frankfurter.dev/v1/latest (trimmed to 3 rates).
export const latestRatesFixture = {
  amount: 1.0,
  base: "EUR",
  date: "2026-11-18",
  rates: { GBP: 0.8329, JPY: 174.85, USD: 1.0968 },
};

export const LATEST_URL = "https://api.frankfurter.dev/v1/latest";

// Default "happy path" handlers. Individual tests override these with server.use().
export const handlers = [
  http.get(LATEST_URL, () => HttpResponse.json(latestRatesFixture)),
];
