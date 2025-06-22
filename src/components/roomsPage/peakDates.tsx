// src/components/roomsPage/PeakDates.tsx

import { useEffect, useState } from "react";

interface PeakDate {
  date: string;
  demand: number;
}

export default function PeakDates({ roomId }: { roomId: string }) {
  const [peakDates, setPeakDates] = useState<PeakDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPeakDates() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:1337/api/bookings/forecast?roomId=${roomId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const forecastData = Array.isArray(data)
          ? data
          : data?.forecast || data || [];

        // Ensure we have valid data structure
        const validPeakDates = forecastData
          .filter((item: any) => item.date && typeof item.demand === "number")
          .sort((a: any, b: any) => b.demand - a.demand)
          .slice(0, 5);

        setPeakDates(validPeakDates);
      } catch (error) {
        console.error("Failed to fetch peak dates:", error);
        setError(`Failed to load recommendations. Please try again later.`);
      } finally {
        setLoading(false);
      }
    }

    fetchPeakDates();
  }, [roomId]);

  if (loading)
    return <div className="text-center py-4">Loading recommendations...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!peakDates.length) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-100">
        <h3 className="text-xl font-bold text-amber-800 mb-4">
          AI-Powered Booking Recommendations
        </h3>
        <p className="text-gray-600">
          No demand forecast data available for this room.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-amber-100">
      <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        AI-Powered Booking Recommendations
      </h3>

      <p className="text-gray-600 mb-4">
        Our system predicts these dates will be in high demand:
      </p>

      <div className="space-y-3">
        {peakDates.map((peakDate) => (
          <div
            key={peakDate.date}
            className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100"
          >
            <div className="font-medium text-gray-800">
              {new Date(peakDate.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-amber-800 mr-2">
                {Math.round(peakDate.demand * 100)}% demand
              </span>
              {peakDate.demand > 1.5 ? (
                <span className="px-2 py-1 text-xs rounded-full bg-amber-200 text-amber-800">
                  Peak Season
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Good Deal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4 italic">
        Prices may be higher during peak demand periods. Book early to secure
        availability.
      </p>
    </div>
  );
}
