// types/booking.ts
export type Service = {
  id: number;
  attributes: {
    name: string;
    duration: number;
    price: number;
    description?: string;
  } | null;
} | null;

export type Customer = {
  id: number;
  attributes: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  } | null;
} | null;

export type Booking = {
  id: number;
  attributes: {
    booking_date: string;
    status: "pending" | "confirmed" | "cancelled";
    confirmation_code?: string;
    service: {
      data: Service;
    } | null;
    customer: {
      data: Customer;
    } | null;
  };
};
