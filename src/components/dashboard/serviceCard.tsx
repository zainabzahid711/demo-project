// src/components/ServiceCard.tsx
"use client";

import { FiScissors } from "react-icons/fi";
import { useRouter } from "next/navigation";

type Service = {
  id: number;
  name: string;
  duration: string;
  price: number;
};

// Add this prop to ServiceCard component
interface ServiceCardProps {
  service: {
    id: number;
    attributes: {
      name: string;
      duration: number;
      price: number;
    };
  };
}

export default function ServiceCard({ service }: { service: Service }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition p-6">
      <div className="flex items-center gap-2 mb-2">
        <FiScissors className="text-teal-600" />
        <h4 className="font-bold text-lg text-teal-700">{service.name}</h4>
      </div>
      <div className="flex justify-between text-sm text-neutral-600 mb-3">
        <span>⏱️ {service.duration}</span>
        <span>💵 ${service.price}</span>
      </div>
      <button
        onClick={() => router.push(`/dashboard/book?service=${service.id}`)}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition"
      >
        Book Now
      </button>
    </div>
  );
}
