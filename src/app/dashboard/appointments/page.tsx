// src/app/dashboard/appointments/page.tsx
"use client";
import useBookings from "@/src/hooks/useBookings";
import BookingCard from "@/src/components/dashboard/bookingCard";
import LoadingSpinner from "@/src/components/ui/loadingSpinner";

export default function AppointmentsPage() {
  const { bookings, loading, error, refresh } = useBookings();

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Appointments</h1>
        <button
          onClick={refresh}
          className="text-sm text-teal-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No appointments booked yet</p>
            <a
              href="/dashboard/book"
              className="text-teal-600 hover:underline mt-2 inline-block"
            >
              Book a service
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
