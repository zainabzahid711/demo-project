"use client";
import { FiDollarSign, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useCurrency } from "@/src/contexts/currencyContext";
import { useState, useRef, useEffect } from "react";

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (newCurrency: "USD" | "PKR") => {
    setCurrency(newCurrency);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-3 border border-gray-200 hover:shadow-xl transition-all duration-300"
          aria-label="Currency selector"
          aria-expanded={isOpen}
        >
          <FiDollarSign className="text-teal-600" />
          <span className="font-medium">
            {currency === "PKR" ? "₨ PKR" : "$ USD"}
          </span>
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => handleCurrencyChange("PKR")}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 ${
                currency === "PKR"
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700"
              }`}
            >
              <span>₨</span>
              <span>PKR</span>
            </button>
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 ${
                currency === "USD"
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700"
              }`}
            >
              <span>$</span>
              <span>USD</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencySelector;
