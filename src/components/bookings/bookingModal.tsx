"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import { Room, BookingDetails } from "@/src/lib/types/booking";
import SuccessModal from "./successModel";
import AuthPrompt from "./authPrompt";
import BookingSummary from "./bookingSummary";
import { InputField, TextAreaField } from "./formFeilds";
import { useAuth } from "@/src/contexts/auth-context";

export default function BookingModal({
  room,
  bookingDetails,
  onClose,
}: {
  room: Room;
  bookingDetails: BookingDetails;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  // const [isGuestBooking, setIsGuestBooking] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  // const [existingUser, setExistingUser] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUserExists = async (email: string) => {
    try {
      const res = await fetch(`/api/users?email=${email}`);
      return res.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!user) {
      const userExists = await checkUserExists(formData.email);
      if (userExists) {
        setShowAuthPrompt(true);
        setIsSubmitting(false);
        return;
      }
    }

    // if (isGuestBooking && !isAuthenticated) {
    //   const userExists = await checkUserExists(formData.email);
    //   if (userExists) {
    //     setExistingUser(true);
    //     setShowAuthPrompt(true);
    //     setIsSubmitting(false);
    //     return;
    //   }
    // }

    try {
      const startDateStr = bookingDetails.startDate.toISOString().split("T")[0];
      const endDateStr = bookingDetails.endDate.toISOString().split("T")[0];

      const response = await fetch("http://localhost:1337/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
            status: "confirmed",
            specialRequests: formData.specialRequests,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
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
    return <SuccessModal onClose={onClose} email={formData.email} />;
  }

  if (showAuthPrompt) {
    return (
      <AuthPrompt
        existingUser={true}
        email={formData.email}
        onContinueAsGuest={() => {
          // setIsGuestBooking(true);
          setShowAuthPrompt(false);
        }}
        onAuthSuccess={() => {
          setShowAuthPrompt(false);
          // setIsGuestBooking(false);
        }}
        onClose={onClose}
      />
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
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <InputField
                    label="Full Name *"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                  />
                  <InputField
                    label="Email *"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                  />
                  <TextAreaField
                    label="Special Requests"
                    value={formData.specialRequests}
                    onChange={(value) =>
                      setFormData({ ...formData, specialRequests: value })
                    }
                  />
                </div>
              </div>

              <BookingSummary
                room={room}
                bookingDetails={bookingDetails}
                isSubmitting={isSubmitting}
                error={error}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
