"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Room } from "@/src/lib/types/booking";
import { formatDate } from "@/src/utils/utils";

type BookingDetails = {
  startDate: Date;
  endDate: Date;
  guests: number;
  total: number;
};

export default function BookingModal({
  room,
  bookingDetails,
  onClose,
}: {
  room: Room;
  bookingDetails: BookingDetails;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format dates as YYYY-MM-DD
      const startDateStr = bookingDetails.startDate.toISOString().split("T")[0];
      const endDateStr = bookingDetails.endDate.toISOString().split("T")[0];

      // Directly create the booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            room: room.id,
            startDate: startDateStr,
            endDate: endDateStr,
            guest: bookingDetails.guests,
            totalPrice: bookingDetails.total,
            customer_name: formData.name,
            customer_email: formData.email,
            status: "pending", // or "confirmed" if you want
            specialRequests: formData.specialRequests,
          },
        }),
      });

      console.log("raw response", response);

      const data = await response.json();

      if (!response.ok) {
        const text = await response.text();
        console.log("error response text", text);
        throw new Error(data.error?.message || "Booking failed");
      }

      setSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="mb-6">Thank you for your reservation.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">Complete Your Booking</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Your Information Section (unchanged) */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-slate-300 rounded-lg p-3"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-slate-300 rounded-lg p-3"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Special Requests
                    </label>
                    <textarea
                      className="w-full border border-slate-300 rounded-lg p-3"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Booking Summary Section (unchanged) */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-medium text-lg mb-2">
                    {room.attributes.name}
                  </h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Check-in</span>
                      <span>{formatDate(bookingDetails.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Check-out</span>
                      <span>{formatDate(bookingDetails.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests</span>
                      <span>{bookingDetails.guests}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${bookingDetails.total.toFixed(2)}</span>
                      </div>
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

                {error && (
                  <div className="mt-4 text-red-500 text-sm">{error}</div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
