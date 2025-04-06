"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isApiAvailable, setIsApiAvailable] = useState(false);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/users"
          // {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     username: "newuser",
          //     email: "email@site.com",
          //     password: "test123",
          //   }),
          // }
        );
        if (response.ok) {
          console.log("registered successfully");
          setIsApiAvailable(true);
        } else {
          const errorData = await response.json();
          console.log("registration failed", errorData);
          setIsApiAvailable(false);
        }
      } catch (error) {
        console.error("Error connecting to API:", error);
        setIsApiAvailable(false);
      }
    };
    checkApiStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("signing in with:", email, password);

    // Send login data to the backend
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("jwt", data.jwt);
      console.log("signup successful:", data);
      // Handle successful login (e.g., store token, redirect user)
    } else {
      const errorData = await response.json();
      console.error("signup failed:", errorData);
      // Handle login failure (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-neutral-50 p-4 sm:p-6 lg:p-8">
      {/* Parent div: Wider + Responsive padding */}
      <div className="w-full max-w-2xl p-12 sm:p-16 bg-white rounded-2xl shadow-sm border border-neutral-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-2">
            BookEase
          </h1>
          <p className="text-neutral-600 sm:text-lg">
            Create your account to start booking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-neutral-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="jhon doe"
              className="w-full px-4 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* Email */}
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

          {/* Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 sm:py-4 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-base sm:text-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm sm:text-base text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-700 hover:underline"
          >
            Log in
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

export default SignupPage;
