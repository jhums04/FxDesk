import { useQuery } from "@tanstack/react-query";
import { getLatestRates } from "@/api/frankfurter";
import { rateKeys } from "@/api/queryKeys";

export function useLatestRates() {
  return useQuery({
    queryKey: rateKeys.latest(),
    queryFn: getLatestRates,
  });
}
