import { useLatestRates } from "./useLatestRates";

export function LatestRates() {
  const { data, isLoading, isError, error } = useLatestRates();

  // State 1: Loading
  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading rates...</p>
      </div>
    );
  }

  // State 2: Error
  if (isError) {
    return (
      <div className="p-8">
        <p className="text-destructive">
          Error: {error?.message || "Failed to load rates"}
        </p>
      </div>
    );
  }

  // State 3: Empty - no data, or a response with an empty rates object
  if (!data || Object.keys(data.rates).length === 0) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">No rates available</p>
      </div>
    );
  }

  // State 4: Success - display the rates
  return (
    <div className="p-8">
      <div className="bg-card text-card-foreground border border-border rounded-lg p-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Latest Exchange Rates
        </h2>
        <p className="text-muted-foreground mb-6">
          Base: {data.base} | As of: {data.date}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data.rates).map(([currency, rate]) => (
            <div
              key={currency}
              className="flex justify-between p-2 hover:bg-muted rounded"
            >
              <span className="font-medium">{currency}</span>
              <span className="text-muted-foreground">{rate.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
