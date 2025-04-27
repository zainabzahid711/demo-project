// src/utils/format.ts
import { CurrencyCode } from "@/src/contexts/currencyContext";
import { useCurrency } from "@/src/contexts/currencyContext";

export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = "PKR"
): string => {
  const { convert } = useCurrency(); // Get conversion function

  // Convert the amount first
  const convertedAmount = convert(amount);

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
