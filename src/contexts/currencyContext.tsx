// src/contexts/currencyContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "PKR" | "USD" | "EUR";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convert: (amount: number) => number; // Add conversion function
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "PKR",
  setCurrency: () => {},
  convert: (amount) => amount, // Default no conversion
  exchangeRate: 1,
});

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>("PKR");
  const [exchangeRate, setExchangeRate] = useState<number>(280);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Load saved preference
    const savedCurrency = localStorage.getItem(
      "preferredCurrency"
    ) as CurrencyCode | null;
    if (savedCurrency) setCurrency(savedCurrency);

    // 2. Fetch current exchange rates (simplified example)
    const fetchRates = async () => {
      try {
        // In a real app, you would fetch from an API:
        // const response = await fetch('https://api.exchangerate-api.com/v4/latest/PKR');
        // const data = await response.json();
        // setExchangeRate(data.rates.USD);

        // Mock data:
        setExchangeRate(280); // 1 USD = 280 PKR
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
        setExchangeRate(280); // Fallback
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const handleSetCurrency = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const convert = (amount: number) => {
    if (isLoading) return amount;

    switch (currency) {
      case "USD":
        return amount / exchangeRate;
      case "EUR":
        return amount / (exchangeRate * 0.85);
      default:
        return amount;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convert,
        exchangeRate,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
