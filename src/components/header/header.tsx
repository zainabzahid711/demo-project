// components/header/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import NavLinks from "./navLinks";
import AuthButtons from "./authButtons";
import UserDropdown from "./userDropDown";
import { useAuth } from "@/src/contexts/auth-context";

const Header = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-slate-200 border-b border-gray-200 transition-all ${
        scrolled ? "shadow-sm py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left section - logo and nav */}
          <div className="flex items-center space-x-6">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-yellow-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={1.5}
                    d="M15 5a3 3 0 013 3v8a3 3 0 01-3 3m4-9V8a4 4 0 00-4-4m-8 8h6m-6-4h6m4 0h2m-2 4h2"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">AzureStay</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Right section - user controls */}
          <div className="flex items-center space-x-4">
            {user && (
              <button className="p-2 rounded-full text-gray-700 hover:text-yellow-600 hover:bg-gray-100 relative">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            )}

            {user ? <UserDropdown /> : <AuthButtons />}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <NavLinks mobile />
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/profile"
                  className="block px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    // logout logic here
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-yellow-600 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
