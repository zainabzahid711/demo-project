// src/components/room/BookingSidebar.tsx
"use client";

import { Room } from "@/src/lib/types/booking";
import { useState } from "react";
import { DateRange, Range, DateRangeProps } from "react-date-range";
import addDays from "date-fns/addDays";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookingSidebar({ room }: { room: Room }) {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState(1);
  const nights =
    state[0].endDate && state[0].startDate
      ? Math.ceil(
          (state[0].endDate.getTime() - state[0].startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  const price =
    typeof room.attributes.price === "number"
      ? room.attributes.price
      : Number(room.attributes.price);

  const subtotal = price * nights;

  // const subtotal = room.attributes.price * nights;
  const serviceFee = 25;
  const total = subtotal + serviceFee;

  const handleDateChange: DateRangeProps["onChange"] = (item) => {
    if (item.selection) {
      setState([item.selection]);
    }
  };

  return (
    <div className="sticky top-6 ">
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">
          Reserve This Room
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dates
            </label>
            <DateRange
              // firstDayOfWeek={1}
              showMonthAndYearPickers={false}
              editableDateInputs={true}
              onChange={handleDateChange}
              moveRangeOnFirstSelection={false}
              ranges={state}
              minDate={new Date()}
              rangeColors={["#1e293b"]}
              className="w-full border min-w-[330px] border-slate-300 rounded-lg overflow-hidden"
            />
          </div>

          {/* Rest of the component  */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-3"
            >
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
                ${Number(room.attributes.price).toFixed(2)} * {nights} night
                {nights !== 1 ? "s" : ""}
              </span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Service fee</span>
              <span className="font-medium">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors font-medium"
            onClick={() => {
              console.log("Booking details:", {
                roomId: room.id,
                startDate: state[0].startDate,
                endDate: state[0].endDate,
                guests,
                total,
              });
            }}
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
