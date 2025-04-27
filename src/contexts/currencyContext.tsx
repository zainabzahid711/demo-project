// src/contexts/currencyContext.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "PKR" | "USD";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convert: (amount: number) => number; // Add conversion function
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "PKR",
  setCurrency: () => {},
  convert: (amount) => amount, // Default no conversion
});

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>("PKR");
  const [exchangeRate, setExchangeRate] = useState<number>(1);

  useEffect(() => {
    // Load saved currency and fetch exchange rate
    const savedCurrency = localStorage.getItem(
      "preferredCurrency"
    ) as CurrencyCode | null;
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    // For now we'll use a fixed rate (1 USD = 280 PKR as an example)
    setExchangeRate(280);
  }, []);

  const handleSetCurrency = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const convert = (amount: number) => {
    if (currency === "USD") {
      return amount / exchangeRate; // Convert PKR to USD
    }
    return amount; // Keep as PKR
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: handleSetCurrency, convert }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
