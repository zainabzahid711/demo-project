"use client";
import { useState } from "react";
import { FiScissors, FiClock } from "react-icons/fi";
import Link from "next/link";
import { Service } from "@/src/lib/types/booking";
import { formatCurrency } from "@/src/utils/format";
import LoadingSpinner from "../ui/loadingSpinner";
import { useCurrency } from "@/src/contexts/currencyContext";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const { currency } = useCurrency();

  if (!service || !service.attributes) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-red-500">
        Service information is incomplete
      </div>
    );
  }

  const { name, description, duration, price } = service.attributes;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start gap-4 mb-4">
          <div
            className="bg-teal-100 p-3 rounded-full flex-shrink-0"
            aria-hidden="true"
          >
            <FiScissors className="text-teal-600 text-xl" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            {description && (
              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FiClock className="text-gray-400" aria-hidden="true" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">
              {formatCurrency(price, currency)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <Link
          href={`/dashboard/book?service=${service.id}`}
          onClick={() => setIsNavigating(true)}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-center"
          aria-label={`Book ${name} service`}
        >
          {isNavigating ? (
            <LoadingSpinner />
          ) : (
            <>
              <FiScissors size={16} aria-hidden="true" />
              <span>Book Now</span>
            </>
          )}
        </Link>
      </div>
    </article>
  );
}
