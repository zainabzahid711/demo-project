// src/lib/api/bookings/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getStrapiURL } from "@/src/utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, roomId, status } = req.query;

    let filters = "";
    if (userId)
      filters += `&filters[users_permissions_user][id][$eq]=${userId}`;
    if (roomId) filters += `&filters[room][id][$eq]=${roomId}`;
    if (status) filters += `&filters[status][$eq]=${status}`;

    const response = await fetch(
      `${getStrapiURL()}/api/bookings?populate=room${filters}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Get bookings error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
