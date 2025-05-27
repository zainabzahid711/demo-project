// src/lib/api/bookings/check-availability.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getStrapiURL } from "@/src/utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { room, startDate, endDate } = req.body;

    // Fetch existing bookings for this room that overlap with the requested dates
    const response = await fetch(
      `${getStrapiURL()}/api/bookings?filters[room][id][$eq]=${room}&filters[$or][0][startDate][$lte]=${endDate}&filters[$or][0][endDate][$gte]=${startDate}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    // If any bookings exist for these dates, room is not available
    const available = data.data.length === 0;

    return res.status(200).json({ available });
  } catch (error) {
    console.error("Availability check error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
