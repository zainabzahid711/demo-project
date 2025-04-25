// src/lib/auth.ts
import { User } from "@/src/lib/types/booking";

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("jwt");
}

export function getJWT(): string | null {
  return localStorage.getItem("jwt");
}

export function logout(): void {
  localStorage.removeItem("jwt");
  // Optional: Add redirect or event triggering
}

// New utility for user data
export async function fetchCurrentUser(): Promise<User> {
  const jwt = getJWT();
  if (!jwt) throw new Error("Not authenticated");

  const response = await fetch("http://localhost:1337/api/users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) logout();
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}
