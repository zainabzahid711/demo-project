"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ApiStatus = "checking" | "available" | "unavailable";
type FormErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    api: "checking" as ApiStatus,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Validate API status
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

  // Real-time validation
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "Username is required";
        else if (value.length < 3) error = "Username too short (min 3 chars)";
        else if (!/^[a-zA-Z0-9_]+$/.test(value))
          error = "Only letters, numbers and underscores";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password too short (min 6 chars)";
        break;

      case "confirmPassword":
        if (value !== formData.password) error = "Passwords don't match";
        break;
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change but don't show error until blur
    if (errors[name as keyof FormErrors]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (status.api !== "available") return;

    setStatus((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("jwt", data.jwt);
        router.push("/dashboard");
        // Redirect or show success message
      } else {
        throw new Error(
          data.message?.[0]?.messages?.[0]?.message || "Signup failed"
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : "Signup failed",
      }));
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const inputClasses =
    "w-full px-4 py-3 sm:py-4 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base";

  const errorInputClasses = "border-red-500 focus:ring-red-500";

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "john_doe",
      requirements: "3+ chars, letters/numbers/_ only",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      requirements: "Minimum 6 characters",
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-neutral-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl p-12 sm:p-16 bg-white rounded-2xl shadow-sm border border-neutral-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-800 mb-2">
            BookEase
          </h1>
          <p className="text-neutral-600 sm:text-lg">
            Create your account to start booking
          </p>
        </div>

        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <div className="flex justify-between items-baseline">
                <label className="block text-sm sm:text-base font-medium text-neutral-700 mb-2">
                  {field.label}
                </label>
                {field.requirements && (
                  <span className="text-xs text-neutral-500">
                    {field.requirements}
                  </span>
                )}
              </div>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className={`${inputClasses} ${
                  errors[field.name as keyof FormErrors]
                    ? errorInputClasses
                    : ""
                }`}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors[field.name as keyof FormErrors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name as keyof FormErrors]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={status.loading || status.api !== "available"}
            className={`w-full bg-teal-700 hover:bg-teal-800 text-white py-3 sm:py-4 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-base sm:text-lg ${
              status.loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {status.loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm sm:text-base text-neutral-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-700 hover:underline"
          >
            Log in
          </Link>
        </div>

        {status.api === "unavailable" && (
          <p className="text-center text-red-500 mt-4">
            API is not available. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
