// components/landingPage/RoomShowcase.tsx
"use client";
import { useState } from "react";
import { FiArrowRight, FiStar, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../ui/loadingSpinner";
// import { Room } from "@/src/lib/types/booking";

const ROOMS = [
  {
    id: 1,
    name: "Executive King",
    description: "Sophisticated workspace with ergonomic furnishings",
    price: 349,
    size: 55,
    capacity: 2,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Deluxe Suite",
    description: "Spacious retreat with premium amenities and city views",
    price: 299,
    size: 45,
    capacity: 2,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Presidential Suite",
    description: "Ultimate luxury experience with separate living area",
    price: 599,
    size: 85,
    capacity: 4,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
];

export default function RoomShowcase() {
  const [isExploringAll, setIsExploringAll] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4">
            Our Signature Spaces
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl">
            Discover your perfect retreat among our carefully curated rooms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <div
              key={room.id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-64 bg-slate-200 relative">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={room.id === 1} // Only prioritize first image
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {room.name}
                      </h3>
                      <div className="flex items-center text-white/90 mt-1">
                        <FiMapPin className="mr-1" size={14} />
                        {/* <span className="text-sm">{room.location}</span> */}
                      </div>
                    </div>
                    <p className="text-amber-400 font-bold text-xl">
                      ${room.price}
                      <span className="text-white text-sm font-normal ml-1">
                        /night
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-amber-500 mr-2">
                    <FiStar className="fill-current" />
                    <span className="ml-1 font-medium text-slate-800">
                      {room.rating}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 mb-4">{room.description}</p>

                <Link
                  href={`/rooms/${room.id}`}
                  onClick={() =>
                    setIsLoading((prev) => ({ ...prev, [room.id]: true }))
                  }
                  className="w-full  text-center bg-slate-800 hover:bg-slate-900 text-white py-3 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {isLoading[room.id] ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      Loading...
                    </>
                  ) : (
                    "View Details"
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/rooms"
            onClick={() => setIsExploringAll(true)}
            className="inline-flex items-center px-6 py-3 border border-slate-300 rounded-full text-slate-700 hover:bg-slate-50 transition-colors text-lg font-medium min-h-[52px]"
          >
            {isExploringAll ? (
              <>
                <LoadingSpinner size="sm" color="muted" className="mr-2" />
                Loading Rooms...
              </>
            ) : (
              <>
                Explore All Rooms
                <FiArrowRight className="ml-2" />
              </>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}
