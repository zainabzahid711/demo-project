"use client";
import Link from "next/link";
import { FiStar, FiSquare, FiUsers } from "react-icons/fi";
import Image from "next/image";
import { Room } from "@/src/lib/types/booking";
import LoadingSpinner from "../ui/loadingSpinner";
import { useState } from "react";

function RoomCard({
  room,
  variant = "showcase",
}: {
  room: Room;
  variant?: "showcase" | "listing" | "featured";
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  //   const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(
  //     /^https?:\/\//,
  //     ""
  //   );

  // Construct proper image URL
  const imageUrl = room.attributes.image?.data?.attributes?.url
    ? room.attributes.image.data.attributes.url.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${room.attributes.image.data.attributes.url}`
      : room.attributes.image.data.attributes.url
    : "/placeholder-room.jpg";

  const handleLinkClick = () => {
    setIsNavigating(true);
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        variant === "listing"
          ? "bg-white shadow-md hover:shadow-lg"
          : "shadow-none hover:shadow-md"
      }  `}
    >
      <div
        className={`h-64 bg-slate-200 relative ${
          variant === "listing" ? "h-64" : "h-72"
        }`}
      >
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="md" color="primary" />
          </div>
        )}
        <Image
          onLoad={() => setImageLoading(false)}
          src={imageUrl}
          alt={room.attributes.name}
          fill
          className="rounded-t-xl object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          <span className="font-bold text-blue-600">
            ${room.attributes.price}
          </span>
          <span className="text-sm text-slate-500">/night</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`${
              variant === "listing" ? "text-xl" : "text-lg"
            } font-serif font-medium text-slate-800`}
          >
            {room.attributes.name}
          </h3>
          {variant === "listing" && (
            <div className="flex items-center text-amber-400">
              <FiStar className="fill-current" />
              <span className="ml-1 text-slate-700">
                {room.attributes.rating}
              </span>
            </div>
          )}
        </div>

        {variant === "listing" && (
          <p className="text-slate-600 mb-4 line-clamp-2">
            {room.attributes.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-slate-600">
            <FiSquare className="mr-2" />
            <span>{room.attributes.size} sq.ft</span>
          </div>
          <div className="flex items-center text-slate-600">
            <FiUsers className="mr-2" />
            <span>Max {room.attributes.capacity} guests</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Link
            href={`/rooms/${room.id}`}
            className={`inline-block w-full text-center px-6 py-2 bg-slate-800 hover:bg-slate-950 text-white rounded-lg transition-colors duration-300 ${
              isNavigating ? "opacity-75" : ""
            }`}
            onClick={handleLinkClick}
          >
            {isNavigating ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" color="white" />
                Loading...
              </div>
            ) : (
              "View Details"
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
