"use strict";

module.exports = {
  async checkAvailability(ctx) {
    try {
      const { room, startDate, endDate } = ctx.request.body;

      if (!room || !startDate || !endDate) {
        return ctx.badRequest("Missing required parameters");
      }

      const overlappingBookings = await strapi.entityService.findMany(
        "api::booking.booking",
        {
          filters: {
            room: { id: room },
            $or: [
              {
                startDate: { $lte: endDate },
                endDate: { $gte: startDate },
              },
            ],
          },
        }
      );

      return { available: overlappingBookings.length === 0 };
    } catch (err) {
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
            status: data.status || "pending",
            confirmation_code:
              data.confirmation_code ||
              `BK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
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
