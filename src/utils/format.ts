// src/utils/format.ts
import { CurrencyCode } from "@/src/contexts/currencyContext";

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode,
  exchangeRate: number
): string => {
  let convertedAmount = amount;

  if (currency === "USD") {
    convertedAmount = amount / exchangeRate;
  } else if (currency === "EUR") {
    convertedAmount = amount / (exchangeRate * 1.14);
  }
  // const { convert } = useCurrency(); // Get conversion function

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "PKR" ? 0 : 2, // Show 2 decimals for USD
  };

  return new Intl.NumberFormat(
    currency === "PKR" ? "ur-PK" : "en-US",
    options
  ).format(convertedAmount);
};
