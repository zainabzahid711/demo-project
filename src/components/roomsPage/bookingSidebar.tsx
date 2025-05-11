// src/components/room/BookingSidebar.tsx
"use client";

import { Room } from "@/src/lib/types/booking";
import { useState } from "react";

export default function BookingSidebar({ room }: { room: Room }) {
  const [nights, setNights] = useState(2);

  return (
    <div className="sticky top-6">
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">
          Reserve This Room
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dates
            </label>
            <div className="border border-slate-300 rounded-lg p-3 text-slate-500">
              Select check-in and check-out dates
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Guests
            </label>
            <select className="w-full border border-slate-300 rounded-lg p-3">
              {Array.from({ length: room.attributes.capacity }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-600">
                ${room.attributes.price} x {nights} nights
              </span>
              <span className="font-medium">
                ${room.attributes.price * nights}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Service fee</span>
              <span className="font-medium">$25</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${room.attributes.price * nights + 25}</span>
            </div>
          </div>

          <button className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors font-medium">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
