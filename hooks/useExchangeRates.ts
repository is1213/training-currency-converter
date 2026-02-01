import { useState, useEffect, useCallback, useRef } from "react";
import { ExchangeRates } from "@/types";

export function useExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/rates");
      const data = await response.json();
      if (!isMounted.current) return;
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch exchange rates");
      }
      setExchangeRates(data.data);
    } catch (err: any) {
      if (!isMounted.current) return;
      setError(
        err.message || "Failed to fetch exchange rates. Please try again later."
      );
      console.error("Error fetching rates:", err);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchRates();
    return () => {
      isMounted.current = false;
    };
  }, [fetchRates]);

  // Expose refresh method
  const refresh = useCallback(() => {
    fetchRates();
  }, [fetchRates]);

  return { exchangeRates, loading, error, refresh };
}
