// src/lib/types/booking.ts
// src/lib/types/booking.ts
export interface Room {
  id: number | string;
  attributes: {
    name: string;
    description?: string;
    pricePerNight: number;
    size: number;
    maxOccupancy: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
          width?: number;
          height?: number;
        };
      };
    };
    // Add amenities if you have them
    amenities?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          icon: string;
        };
      }>;
    };
  };
}
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string; // optional
  // Add any other user properties you need
}
export interface ServiceAttributes {
  name: string;
  duration: number;
  price: number;
  description?: string;
  category?: string;
}

export interface Service {
  id: number;
  attributes: ServiceAttributes;
}

// For API responses
export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

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
