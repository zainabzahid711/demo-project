import { NextApiRequest, NextApiResponse } from "next";
import { getStrapiURL } from "@/src/utils/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { email } = req.query;

  try {
    const response = await fetch(
      `${getStrapiURL()}/api/users?filters[email][$eq]=${email}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    res.status(response.status).json({
      exists: (await response.json()).length > 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
}
