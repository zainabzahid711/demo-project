// src/lib/api/rooms.ts
import { Room } from "../types/booking";
export interface RoomImage {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface RoomAttributes {
  name: string;
  description: string;
  price: number;
  size: number;
  capacity: number;
  rating: number;
  image?: RoomImage;
}

// export interface Room {
//   id: string;
//   attributes: RoomAttributes;
// }

const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";

export async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${API_URL}/rooms?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(`Failed to fetch rooms. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("api responce:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Failed to fetch rooms. Please try again later.");
  }
}

export async function getRoomById(id: string): Promise<Room> {
  try {
    const res = await fetch(`${API_URL}/rooms/${id}?populate=*`);

    if (!res.ok) {
      throw new Error(`Failed to fetch room ${id}. Status: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching room ${id}:`, error);
    throw new Error(`Failed to fetch room ${id}. Please try again later.`);
  }
}
