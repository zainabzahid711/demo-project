"use client";

import { Room, BookingDetails } from "@/src/lib/types/booking";
import { formatDate } from "@/src/utils/utils";

interface BookingSummaryProps {
  room: Room;
  bookingDetails: BookingDetails;
  isSubmitting: boolean;
  error: string | null;
}

interface DetailRowProps {
  label: string;
  value: string;
  isBold?: boolean;
}

function DetailRow({ label, value, isBold = false }: DetailRowProps) {
  return (
    <div className={`flex justify-between ${isBold ? "font-medium" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function BookingSummary({
  room,
  bookingDetails,
  isSubmitting,
  error,
}: BookingSummaryProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
      <div className="border border-slate-200 rounded-lg p-4">
        <h4 className="font-medium text-lg mb-2">{room.attributes.name}</h4>
        <div className="space-y-2 text-sm text-slate-600">
          <DetailRow
            label="Check-in"
            value={formatDate(bookingDetails.startDate)}
          />
          <DetailRow
            label="Check-out"
            value={formatDate(bookingDetails.endDate)}
          />
          <DetailRow label="Guests" value={bookingDetails.guests.toString()} />
          <div className="border-t border-slate-200 pt-2 mt-2">
            <DetailRow
              label="Total"
              value={`$${bookingDetails.total.toFixed(2)}`}
              isBold
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium disabled:opacity-70"
      >
        {isSubmitting ? "Processing..." : "Confirm Booking"}
      </button>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
    </div>
  );
}
