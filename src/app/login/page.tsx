"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/auth-context";

type ApiStatus = "checking" | "available" | "unavailable";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    api: "checking" as ApiStatus,
  });

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/users");
        setStatus((prev) => ({
          ...prev,
          api: res.ok ? "available" : "unavailable",
        }));
      } catch (err) {
        console.error("API check error", err);
        setStatus((prev) => ({ ...prev, api: "unavailable" }));
      }
    };

    checkApiStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus((prev) => ({ ...prev, loading: true, error: "" }));

    // DEBUG: Log what's being sent
    console.log("Submitting:", {
      identifier: formData.email, // or username if you have that field
      password: formData.password,
    });

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        //--------getting user data from auth context---------------
        login(data.jwt, data.user);

        router.push("/dashboard");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Login failed",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const inputClasses =
    "w-full px-4 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base";
  const buttonClasses = `w-full bg-teal-700 hover:bg-teal-800 text-white py-3 sm:py-4 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-base sm:text-lg ${
    status.loading || status.api !== "available"
      ? "opacity-70 cursor-not-allowed"
      : ""
  }`;

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-neutral-50 p-8 xs:p-2 md:p-8">
      <div className="w-full max-w-2xl p-9 sm:p-28 md:p-12 bg-white rounded-2xl shadow-sm border border-neutral-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600 sm:text-lg">
            Login to access your bookings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label className="block text-sm sm:text-base font-medium text-neutral-700 mb-2">
                {field === "email" ? "Username or Email" : "Password"}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={
                  field === "email" ? "example@email.com" : "••••••••"
                }
                className={inputClasses}
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={status.loading || status.api !== "available"}
            className={buttonClasses}
          >
            {status.loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm sm:text-base text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-teal-700 hover:underline"
          >
            Sign up
          </Link>
        </div>

        {status.error && (
          <p className="text-center text-red-500 mt-4">{status.error}</p>
        )}

        {status.api === "checking" && (
          <div className="text-center mt-4">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-teal-600 border-t-transparent rounded-full" />
            <p className="mt-2 text-neutral-500">Checking API status...</p>
          </div>
        )}

        {status.api === "unavailable" && (
          <p className="text-center text-red-500 mt-4">
            API is not available. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
