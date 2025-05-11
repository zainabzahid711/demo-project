// src/components/room/RoomHero.tsx
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Room } from "@/src/lib/types/booking";

export default function RoomHero({ room }: { room: Room }) {
  const imageUrl = room.attributes.image?.data?.attributes?.url
    ? room.attributes.image.data.attributes.url.startsWith("http")
      ? room.attributes.image.data.attributes.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${room.attributes.image.data.attributes.url}`
    : "/placeholder-room.jpg";

  return (
    <div className="relative">
      <div className="h-96 md:h-[500px] w-full relative">
        <Image
          src={imageUrl}
          alt={room.attributes.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/rooms"
            className="absolute top-6 left-4 flex items-center text-white hover:text-amber-300 transition-colors bg-black/30 rounded-full px-4 py-2"
          >
            <FiArrowLeft className="mr-2" />
            Back to Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
