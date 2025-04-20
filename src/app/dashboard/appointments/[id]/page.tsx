// booking detailss
// src/app/dashboard/appointments/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiScissors, FiUser } from "react-icons/fi";
import Link from "next/link";
import LoadingSpinner from "@/src/components/ui/loadingSpinner";

type BookingDetails = {
  id: number;
  attributes: {
    booking_date: string;
    status: "pending" | "confirmed" | "cancelled";
    confirmation_code: string;
    service: {
      data: {
        attributes: {
          name: string;
          duration: number;
          price: number;
        };
      };
    };
    customer: {
      data: {
        attributes: {
          name: string;
          email: string;
          phone: string;
        };
      };
    };
  };
};

// async function getBookingDetails(id: string) {
//   const res = await fetch(
//     `http://localhost:1337/api/bookings/${id}?populate[service][populate][0]=*&populate[customer][populate][0]=*`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) return undefined;
//   return res.json();
// }

export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          `http://localhost:1337/api/bookings/${params.id}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        setBooking(data.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [params.id, router]);

  if (loading) return <LoadingSpinner fullPage />;
  if (!booking) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/dashboard/appointments"
        className="flex items-center gap-2 text-teal-600 mb-6"
      >
        <FiArrowLeft /> Back to Appointments
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Booking Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FiCalendar /> Appointment
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className={`badge-${booking.attributes.status}`}>
                  {booking.attributes.status}
                </span>
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(booking.attributes.booking_date).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Confirmation Code:</span>{" "}
                {booking.attributes.confirmation_code}
              </p>
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FiScissors /> Service
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Service:</span>{" "}
                {booking.attributes.service.data.attributes.name}
              </p>
              <p>
                <span className="font-medium">Duration:</span>{" "}
                {booking.attributes.service.data.attributes.duration} minutes
              </p>
              <p>
                <span className="font-medium">Price:</span> $
                {booking.attributes.service.data.attributes.price}
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FiUser /> Customer
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {booking.attributes.customer.data.attributes.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {booking.attributes.customer.data.attributes.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {booking.attributes.customer.data.attributes.phone ||
                  "Not provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
            Reschedule
          </button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition">
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
