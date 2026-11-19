// Single source of truth for TanStack Query cache keys.
// Keys are arrays so they can be matched by prefix: invalidating rateKeys.all
// also invalidates every key that starts with "rates".
export const rateKeys = {
  all: ["rates"] as const,
  latest: () => [...rateKeys.all, "latest"] as const,
};
