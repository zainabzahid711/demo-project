// src/components/dashboard/header.tsx
"use client";
import {
  FiScissors,
  FiLogOut,
  FiUser,
  FiBell,
  FiCalendar,
  FiHome,
} from "react-icons/fi";
import Image from "next/image";

import { useAuth } from "@/src/contexts/auth-context";

// interface HeaderProps {
//   user: User | null;
//   onLogout: () => void;
// }

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FiScissors className="text-teal-600 text-2xl" aria-hidden="true" />
            <h1 className="text-xl font-bold text-gray-800">SalonBook</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-teal-600 relative">
              <FiBell className="text-xl" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="flex items-center gap-2">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <FiUser className="text-teal-600" />
                </div>
              )}
              <span className="text-sm font-medium">
                {user?.username || "Guest"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 py-3">
          <a
            href="/dashboard"
            className="flex items-center gap-1 text-teal-600 font-medium"
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </a>
          <a
            href="/bookings"
            className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition-colors"
          >
            <FiCalendar className="text-lg" />
            <span>My Appointments</span>
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition-colors ml-auto"
          >
            <FiLogOut className="text-lg" />
            <span>Sign Out</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
