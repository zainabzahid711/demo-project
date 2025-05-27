// src/lib/api/bookings/routes/booking.js
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/bookings/check-availability",
      handler: "booking.checkAvailability",
    },
    {
      method: "POST",
      path: "/bookings",
      handler: "booking.create",
    },
  ],
};
