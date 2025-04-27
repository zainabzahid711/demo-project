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

      // Only update state if we're not already processing a scroll event
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Determine direction and distance scrolled
          const scrollDirection =
            currentScrollY > lastScrollY.current ? "down" : "up";
          const scrollDistance = Math.abs(currentScrollY - lastScrollY.current);

          // Only toggle compact mode if scrolled a significant amount
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 transition-all duration-300 ease-in-out">
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
              <div className="w-10 h-10 bg-teal-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <FiScissors className="text-white text-xl" />
              </div>
              <h1
                className={`text-xl font-bold text-teal-800 transition-all duration-300 ${
                  isCompact
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                }`}
              >
                BookEase Salon
              </h1>
            </Link>

            {/* Always show NavLinks but adjust spacing */}
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
              <button className="p-2 text-gray-600 hover:text-teal-600 relative">
                <FiBell className="text-xl" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
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
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <FiUser className="text-teal-600" />
                  </div>
                )}
                {!isCompact && (
                  <span className="text-sm font-medium">{user.username}</span>
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
              className="flex items-center gap-1 text-gray-600 hover:text-teal-600 transition-colors text-sm"
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
