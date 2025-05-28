import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const strapiResponse = await fetch(
      `${process.env.STRAPI_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!strapiResponse.ok) {
      const errorText = await strapiResponse.text();
      return NextResponse.json(
        { error: errorText },
        { status: strapiResponse.status }
      );
    }

    const data = await strapiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
