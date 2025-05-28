// src/app/api/bookings/controllers/booking.js

"use strict";

module.exports = {
  async checkAvailability(ctx) {
    if (ctx.method !== "POST") {
      return ctx.methodNotAllowed();
    }
    try {
      const { room, startDate, endDate } = ctx.request.body;

      console.log("Strapi received:", { room, startDate, endDate });

      // Handle both direct ID and object with ID
      const roomId = room?.id || room;

      if (!roomId || !startDate || !endDate) {
        return ctx.badRequest("Missing required parameters");
      }

      const overlappingBookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: {
            room: roomId,
            $or: [
              {
                startDate: { $lte: endDate },
                endDate: { $gte: startDate },
              },
            ],
          },
        }
      );

      console.log("Found overlapping bookings:", overlappingBookings);

      return {
        available: overlappingBookings.length === 0,
        debug: { roomId, startDate, endDate }, // For debugging
      };
    } catch (err) {
      console.error("Strapi controller error:", err);
      ctx.throw(500, "Error checking availability");
    }
  },
  async create(ctx) {
    try {
      const { data } = ctx.request.body;

      if (!data) {
        return ctx.badRequest("Missing booking data");
      }

      const booking = await strapi.entityService.create(
        "api::booking.booking",
        {
          data: {
            ...data,
            // status: data.status || "pending",
            // confirmation_code:
            //   data.confirmation_code ||
            //   `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            publishedAt: new Date(),
          },
        }
      );

      return booking;
    } catch (err) {
      ctx.throw(500, "Error creating booking");
    }
  },
};
