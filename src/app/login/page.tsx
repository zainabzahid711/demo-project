"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isApiAvailable, setIsApiAvailable] = useState(false);

  // Check if the backend API is available when the component mounts
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/users");
        if (res.ok) {
          setIsApiAvailable(true);
        } else {
          setIsApiAvailable(false);
        }
      } catch (err) {
        console.error("API check error", err);
        setIsApiAvailable(false);
      }
    };

    checkApiStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("logging up with:", email, password);

    // Send signup data to the backend (replace this with the actual signup API endpoint)
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: "superuniqueuser",
        password: "test123",
      }),
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("jwt", data.jwt);
      console.log("login successful:", data);
      // Handle successful signup (e.g., redirect user, show success message)
    } else {
      const errorData = await response.json();
      console.error("login failed:", errorData);
      // Handle signup failure (e.g., show error message)
    }
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
              username or Email
            </label>
            <input
              type="text"
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
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-teal-700 hover:underline"
          >
            Sign up
          </Link>
        </div>
        {!isApiAvailable && (
          <p className="text-center text-red-500 mt-4">
            API is not available. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
