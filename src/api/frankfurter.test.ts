import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "@/test/server";
import { LATEST_URL, latestRatesFixture } from "@/test/handlers";
import { getLatestRates } from "./frankfurter";

describe("getLatestRates", () => {
  it("returns the parsed response when the API succeeds", async () => {
    await expect(getLatestRates()).resolves.toEqual(latestRatesFixture);
  });

  it("throws when the API responds with an error status", async () => {
    server.use(
      http.get(LATEST_URL, () => new HttpResponse(null, { status: 500 })),
    );

    await expect(getLatestRates()).rejects.toThrow(
      "Error fetching the latest rates!",
    );
  });

  it("throws when a rate is not a number", async () => {
    server.use(
      http.get(LATEST_URL, () =>
        HttpResponse.json({ ...latestRatesFixture, rates: { USD: "1.09" } }),
      ),
    );

    await expect(getLatestRates()).rejects.toThrow();
  });

  it("throws when the date is not a real YYYY-MM-DD date", async () => {
    server.use(
      http.get(LATEST_URL, () =>
        HttpResponse.json({ ...latestRatesFixture, date: "banana" }),
      ),
    );

    await expect(getLatestRates()).rejects.toThrow();
  });
});
