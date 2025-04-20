// src/lib/api/services.ts
import { Service, ApiResponse } from "@/src/lib/types/booking";

export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch("/api/services");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Service[]> = await response.json();

    if (!result.data) {
      throw new Error("No data received from API");
    }

    return result.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error;
  }
}
