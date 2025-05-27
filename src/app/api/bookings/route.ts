// src/app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { getStrapiURL } from "@/src/utils/utils";

export const dynamic = "force-dynamic"; // Optional: if you need dynamic server-side behavior

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.action) {
      return NextResponse.json(
        { message: "Action parameter is required" },
        { status: 400 }
      );
    }

    switch (body.action) {
      case "create":
        return await handleCreateBooking(body);
      // Add other actions here if needed
      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

async function handleCreateBooking(body: any) {
  // First check availability
  const availabilityRes = await fetch(
    `${getStrapiURL()}/api/bookings/check-availability`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization if needed:
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        room: body.room,
        startDate: body.startDate,
        endDate: body.endDate,
      }),
    }
  );

  if (!availabilityRes.ok) {
    throw new Error("Availability check failed");
  }

  const { available } = await availabilityRes.json();

  if (!available) {
    return NextResponse.json(
      { message: "Room not available for selected dates" },
      { status: 400 }
    );
  }

  // Create booking
  const bookingRes = await fetch(`${getStrapiURL()}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization if needed:
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        ...body.bookingData,
        status: "pending",
        confirmation_code: generateConfirmationCode(),
      },
    }),
  });

  if (!bookingRes.ok) {
    throw new Error("Booking creation failed");
  }

  const bookingData = await bookingRes.json();

  return NextResponse.json({
    booking: bookingData,
    confirmation_code: bookingData.confirmation_code,
  });
}

function generateConfirmationCode(): string {
  return `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}
