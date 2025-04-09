// src/app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiCalendar, FiScissors, FiUser, FiLogOut } from "react-icons/fi";
import ServiceCard from "@/src/components/dashboard/serviceCard";

export default function Dashboard() {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) router.push("/login");
  }, []);

  const salonServices = [
    { id: 1, name: "Haircut", duration: "30 min", price: 25 },
    { id: 2, name: "Beard Trim", duration: "20 min", price: 15 },
    { id: 3, name: "Hair Color", duration: "60 min", price: 50 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Header */}
      <header className="bg-teal-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">BookEase</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-teal-800 px-4 py-2 rounded-lg hover:bg-teal-900 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-neutral-200">
          <h2 className="text-xl font-semibold text-teal-800 mb-2">
            Welcome to Your Dashboard
          </h2>
          <p className="text-neutral-600">
            Book your salon services with ease. Start by selecting a service
            below.
          </p>
        </div>

        {/* Services Grid */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-teal-800 mb-6 flex items-center gap-2">
            <FiScissors /> Available Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salonServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-xl font-semibold text-teal-800 mb-6 flex items-center gap-2">
            <FiUser /> Quick Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/dashboard/appointments")}
              className="flex items-center gap-2 bg-white border border-teal-600 text-teal-700 px-4 py-3 rounded-lg hover:bg-teal-50 transition"
            >
              <FiCalendar /> My Appointments
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
