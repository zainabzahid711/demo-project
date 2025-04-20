// src/lib/auth.ts
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("jwt");
}

export function logout(): void {
  localStorage.removeItem("jwt");
}
