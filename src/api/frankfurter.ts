import { latestRatesSchema, type LatestRates } from "./schemas";

const BASE_URL = "https://api.frankfurter.dev/v1";

export async function getLatestRates(): Promise<LatestRates> {
  const response = await fetch(BASE_URL + "/latest");
  if (!response.ok) {
    throw new Error("Error fetching the latest rates!");
  }

  const json = await response.json();
  const data = latestRatesSchema.parse(json);

  return data;
}
