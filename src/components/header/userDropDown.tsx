// components/header/UserDropdown.tsx
"use client";

import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import Image from "next/image";
import { useAuth } from "@/src/contexts/auth-context";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={40}
            height={40}
            className="rounded-full border-2 border-yellow-500"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-100 border-2 border-yellow-500 flex items-center justify-center">
            <FiUser className="text-gray-700 text-lg" />
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {user.username}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
            onClick={() => setIsOpen(false)}
          >
            <FiSettings className="inline mr-2" />
            Profile
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
          >
            <FiLogOut className="inline mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
