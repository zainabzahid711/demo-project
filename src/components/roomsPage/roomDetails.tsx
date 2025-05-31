// src/components/room/RoomDetails.tsx
"use client";
import { FiCheck, FiMapPin } from "react-icons/fi";
import { Room } from "@/src/lib/types/booking";

export default function RoomDetails({ room }: { room: Room }) {
  return (
    <>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">
          About This Space
        </h2>
        <p className="text-slate-600 mb-8">{room.attributes.description}</p>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Premium bedding",
              "City views",
              "Ergonomic workspace",
              "Smart TV with streaming",
              "High-speed WiFi",
              "Air conditioning",
              "Coffee maker",
              "Daily housekeeping",
            ].map((item) => (
              <div key={item} className="flex items-center">
                <FiCheck className="text-green-500 mr-3 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Location
          </h3>
          <div className="flex items-start">
            <FiMapPin className="text-amber-500 mt-1 mr-3 shrink-0" />
            <div>
              <p className="text-slate-600">
                Centrally located in the heart of the city, with easy access to
                public transportation and major attractions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
