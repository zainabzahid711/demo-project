"use client";
import { FiScissors, FiLogOut } from "react-icons/fi";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiScissors className="text-teal-600 text-xl" aria-hidden="true" />
          <h1 className="text-xl font-bold text-gray-800">SalonBook</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
          aria-label="Sign out"
        >
          <FiLogOut aria-hidden="true" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
