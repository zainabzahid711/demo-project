import { Booking } from "@/src/lib/types/booking";
import Link from "next/link";

export default function BookingCard({ booking }: { booking: Booking }) {
  const serviceName =
    booking.attributes.service?.data?.attributes?.name ||
    "No service specified";
  const bookingDate = booking.attributes.booking_date
    ? new Date(booking.attributes.booking_date).toLocaleString()
    : "No date specified";

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{serviceName}</h3>
          <p className="text-gray-600">{bookingDate}</p>
          {/* <StatusBadge status={booking.attributes.status} /> */}

          {booking.attributes.confirmation_code && (
            <p className="text-sm text-teal-600">
              Code: {booking.attributes.confirmation_code}
            </p>
          )}
        </div>
        <span className={`badge-${booking.attributes.status}`}>
          {booking.attributes.status}
        </span>
      </div>
      <Link
        href={`/dashboard/appointments/${booking.id}`}
        className="mt-2 inline-block text-teal-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
