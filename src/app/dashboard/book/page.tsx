// src/app/dashboard/book/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Service = {
  id: number;
  attributes: {
    name: string;
    duration: number;
    price: number;
    description?: string;
  };
};

type JwtPayload = {
  id: number;
  // Add other JWT payload properties if needed
  exp?: number;
  iat?: number;
};

function BookServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const [service, setService] = useState<Service | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!serviceId) {
      router.push("/dashboard");
      return;
    }

    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/services/${serviceId}?populate=*`
        );

        if (!res.ok) throw new Error("Failed to fetch service");

        const { data } = await res.json();
        setService(data);
      } catch (err) {
        setError("Failed to load service details");
        console.error("Fetch error:", err);
      }
    };

    fetchService();
  }, [serviceId, router]);

  useEffect(() => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour}:00`);
      if (hour !== 18) slots.push(`${hour}:30`);
    }
    setTimeSlots(slots);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;
    // const bookingDateTime = new Date(startDate);

    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setError("You need to be logged in to book a service");
      router.push("/login");
      return;
    }

    if (!serviceId) {
      setError("No service selected");
      return;
    }

    try {
      // Decode JWT to get user ID
      const payload = JSON.parse(atob(jwt.split(".")[1])) as JwtPayload;
      const userId = payload.id;

      if (!userId) throw new Error("Invalid user token");

      const res = await fetch("http://localhost:1337/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            booking_date: new Date().toISOString(),
            status: "pending",
            service: serviceId,
            user: userId,
          },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "Booking failed");
      }

      router.push("/dashboard/appointments");
    } catch (error) {
      console.error("Booking error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  if (!service)
    return <div className="text-center py-8">Loading service details...</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Book {service.attributes.name}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6">
        <p className="text-lg">
          Duration: {service.attributes.duration} minutes
        </p>
        <p className="text-lg">Price: ${service.attributes.price}</p>
        {service.attributes.description && (
          <p className="mt-2 text-gray-600">{service.attributes.description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time Slot</label>
          <select className="w-full p-2 border rounded-lg" required>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

// The main export wraps the content in Suspense
export default function BookService() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-8">Loading service details...</div>
      }
    >
      <BookServiceContent />
    </Suspense>
  );
}
