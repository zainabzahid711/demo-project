// src/lib/types/booking.ts

export interface RoomFeature {
  id: number;
  name: string;
}

export interface Room {
  id: number | string;
  attributes: {
    name: string;
    description?: string;
    price: number;
    size: number;
    capacity: number;
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
    Feature?: RoomFeature[];
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

export type BookingDetails = {
  startDate: Date;
  endDate: Date;
  guests: number;
  total: number;
};

export type BookingFormData = {
  name: string;
  email: string;
  specialRequests: string;
};

export interface Booking {
  id: number;
  attributes: {
    status: "pending" | "confirmed" | "cancelled";
    confirmation_code: string;
    startDate: string | Date;
    endDate: string | Date;
    guest: number;
    totalPrice: number;
    customer_name: string;
    customer_email: string;
    createdAt: string;
    updatedAt: string;
    room?: {
      data: Room;
    };
    users_permissions_user?: {
      data: User;
    };
    specialRequests?: string;
  };
}
