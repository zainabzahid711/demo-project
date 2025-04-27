"use client";
import { FiScissors, FiSearch } from "react-icons/fi";
import ServiceCard from "@/src/components/dashboard/serviceCard";
import { Service } from "@/src/lib/types/booking";
import { useState } from "react";

interface ServicesSectionProps {
  services: Service[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function ServicesSection({
  services,
  searchTerm,
  onSearchChange,
}: ServicesSectionProps) {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const sortedServices = [...services].sort((a, b) => {
    if (sortBy === "price") {
      return a.attributes.price - b.attributes.price;
    }
    return a.attributes.name.localeCompare(b.attributes.name);
  });

  return (
    <section className="mb-12" aria-labelledby="services-heading">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2
          id="services-heading"
          className="text-xl font-semibold text-gray-800 flex items-center gap-2"
        >
          <FiScissors className="text-teal-600" aria-hidden="true" />
          <span>Our Services</span>
        </h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              aria-label="Search services"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "price")}
            className="border border-gray-300 rounded-lg p-2 focus:ring-teal-500 focus:border-teal-500"
            aria-label="Sort services by"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {sortedServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? "No services match your search. Try a different term."
              : "No services available at the moment. Please check back later."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}
