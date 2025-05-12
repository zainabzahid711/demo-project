"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/src/contexts/auth-context";
import { FiScissors, FiUser, FiLogOut, FiBell } from "react-icons/fi";
import Image from "next/image";
import NavLinks from "./navLinks";
import AuthButtons from "./authButtons";

const Header = () => {
  const { user, logout } = useAuth();
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollDirection =
            currentScrollY > lastScrollY.current ? "down" : "up";
          const scrollDistance = Math.abs(currentScrollY - lastScrollY.current);

          if (scrollDistance > 30) {
            setIsCompact(currentScrollY > 80 && scrollDirection === "down");
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md border-b border-slate-700 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4">
        {/* Main header bar */}
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            isCompact ? "py-2" : "py-4"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg">
                <svg
                  className="w-5 h-5 text-blue-100"
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
              <h1
                className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-300 ${
                  isCompact
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                }`}
              >
                AzureStay
              </h1>
            </Link>

            {/* NavLinks */}
            <div
              className={`transition-all duration-300 ${
                isCompact ? "ml-2" : "ml-6"
              }`}
            >
              <NavLinks compact={isCompact} />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {user && (
              <button className="p-2 text-slate-300 hover:text-white relative">
                <FiBell className="text-xl" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <FiUser className="text-slate-300" />
                  </div>
                )}
                {!isCompact && (
                  <span className="text-sm font-medium text-slate-100">
                    {user.username}
                  </span>
                )}
              </div>
            ) : (
              <AuthButtons compact={isCompact} />
            )}
          </div>
        </div>

        {/* Additional user actions - only shown in expanded mode */}
        {!isCompact && user && (
          <div className="flex justify-end pb-2">
            <button
              onClick={logout}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <FiLogOut className="text-lg" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
