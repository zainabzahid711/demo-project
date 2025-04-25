// src/contexts/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/src/lib/types/booking";
import {
  fetchCurrentUser,
  getStoredUser,
  storeAuthData,
  logout as authLogout,
} from "@/src/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (jwt: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const storedUser = getStoredUser();

        if (storedUser) {
          setUser(storedUser);
          // Optionally refresh user data
          // const freshUser = await fetchCurrentUser();
          // setUser(freshUser);
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = (jwt: string, user: User) => {
    storeAuthData(jwt, user);
    setUser(user);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const freshUser = await fetchCurrentUser();
      setUser(freshUser);
    } catch (error) {
      console.error("Failed to refresh user", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
