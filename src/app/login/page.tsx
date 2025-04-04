"use client";

import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // TODO: Connect with backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-neutral-50 p-8 xs:p-2 md:p-8">
      {/* Consistent container styling with Signup */}
      <div className="w-full max-w-2xl p-9 sm:p-28 md:p-12 bg-white rounded-2xl shadow-sm border border-neutral-100">
        {/* Header - Changed to "Login" but kept same visual weight */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600 sm:text-lg">
            Login to access your bookings
          </p>
        </div>

        {/* Form - Same spacing/structure as Signup */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email - Identical to Signup */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password - Same as Signup */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button - Changed to "Login" but same styling */}
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 sm:py-4 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-base sm:text-lg"
          >
            Login
          </button>
        </form>

        {/* Footer - Reversed CTA to point to Signup */}
        <div className="mt-8 text-center text-sm sm:text-base text-neutral-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-teal-700 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
