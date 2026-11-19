import { z } from "zod";

// Shape of GET https://api.frankfurter.dev/v1/latest, e.g.
// { "amount": 1.0, "base": "EUR", "date": "2026-11-18", "rates": { "USD": 1.0968, ... } }
export const latestRatesSchema = z.object({
  amount: z.number().positive(),
  base: z.string().length(3),
  date: z.iso.date(),
  rates: z.record(z.string().length(3), z.number().positive()),
});

export type LatestRates = z.infer<typeof latestRatesSchema>;
