// src/lib/auth.ts
import { User } from "@/src/lib/types/booking";

const JWT_KEY = "jwt";
const USER_KEY = "user";

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("jwt");
}

export function getJWT(): string | null {
  return localStorage.getItem(JWT_KEY);
}

export function storeAuthData(jwt: string, user: User): void {
  localStorage.setItem(JWT_KEY, jwt);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): User | null {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
}

export function logout(): void {
  localStorage.removeItem(JWT_KEY);
  localStorage.removeItem(USER_KEY);
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

  const user = await response.json();
  localStorage.setItem(USER_KEY, JSON.stringify(user)); //cashing the user data

  return user;
  // return response.json();
}
