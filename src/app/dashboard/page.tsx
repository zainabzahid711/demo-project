"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/dashboard/header";
import WelcomeSection from "@/src/components/dashboard/welcome";
import ServicesSection from "@/src/components/dashboard/sections/serviceSection";
import QuickActionsSection from "@/src/components/dashboard/sections/quickSection";
import LoadingSpinner from "@/src/components/ui/loadingSpinner";
import { Service, ApiResponse } from "@/src/lib/types/booking";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetchServices = async () => {
      try {
        // Auth check
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          router.push("/login");
          return;
        }

        // Fetch services
        const response = await fetch("http://localhost:1337/api/services");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Service[]> = await response.json();

        if (!result.data) {
          throw new Error("No data received from API");
        }

        setServices(result.data);
      } catch (err) {
        console.error("Failed to load services", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchServices();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const filteredServices = services.filter((service) => {
    const name = service.attributes.name.toLowerCase();
    const description = service.attributes.description?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || description.includes(term);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <ServicesSection
          services={filteredServices}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <QuickActionsSection />
      </main>
    </div>
  );
}
