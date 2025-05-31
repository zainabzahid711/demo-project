"use client";

import { Room } from "@/src/lib/types/booking";
import { useState, useRef, useEffect } from "react";
import { DateRange, Range, DateRangeProps } from "react-date-range";
import addDays from "date-fns/addDays";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import BookingModal from "../bookings/bookingModal";

export default function BookingSidebar({ room }: { room: Room }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const dateRangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const serviceFee = 25;
  const total = subtotal + serviceFee;

  const handleDateChange: DateRangeProps["onChange"] = (item) => {
    if (item.selection) {
      setState([item.selection]);
    }
  };

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="sticky top-6 w-full max-w-md lg:w-[390px]">
      <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">
          Reserve This Room
        </h3>

        <div className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dates
            </label>

            {/* Mobile: Show simplified date display */}
            {isMobile ? (
              <div
                className="w-full border border-slate-300 rounded-lg p-3 text-sm"
                onClick={() => {
                  dateRangeRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {formatDate(state[0].startDate)} -{" "}
                {formatDate(state[0].endDate)}
              </div>
            ) : (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="horizontal"
                minDate={new Date()}
                rangeColors={["#1e293b"]}
                className="w-full border border-slate-300 rounded-lg overflow-hidden"
                monthDisplayFormat="MMMM yyyy"
                showPreview={false}
              />
            )}
          </div>

          {/* Calendar for mobile - positioned separately */}
          {isMobile && (
            <div ref={dateRangeRef} className="mt-4">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="vertical"
                minDate={new Date()}
                rangeColors={["#1e293b"]}
                className="w-full border border-slate-300 rounded-lg overflow-hidden"
                monthDisplayFormat="MMMM yyyy"
                showPreview={false}
              />
            </div>
          )}

          {/* Guests Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
            >
              {Array.from({ length: room.attributes.capacity }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} {i === 0 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-600">
                ${price.toFixed(2)} × {nights} night{nights !== 1 ? "s" : ""}
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

          {/* Reserve Button */}
          <button
            // onClickCapture={()=> setShowBookingModal(true)}
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 active:bg-slate-700"
            onClick={() => setShowBookingModal(true)}
          >
            Reserve Now
          </button>
        </div>
        {showBookingModal && (
          <BookingModal
            room={room}
            bookingDetails={{
              startDate: state[0].startDate ?? new Date(),
              endDate: state[0].endDate ?? addDays(new Date(), 2),
              guests,
              total,
            }}
            onClose={() => setShowBookingModal(false)}
          />
        )}
      </div>
    </div>
  );
}
