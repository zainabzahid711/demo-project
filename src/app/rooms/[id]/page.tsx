// app/rooms/[id]/page.tsx
import { FiStar, FiSquare, FiUsers, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { getRoomById } from "@/src/lib/api/rooms";

export default async function RoomDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const room = await getRoomById(params.id);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/rooms"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Rooms
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {room.attributes.image?.data && (
              <div className="relative h-96 rounded-xl overflow-hidden mb-6">
                <Image
                  src={
                    room.attributes.image.data.attributes.url.startsWith("http")
                      ? room.attributes.image.data.attributes.url
                      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${room.attributes.image.data.attributes.url}`
                  }
                  alt={room.attributes.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">
              {room.attributes.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-slate-600">
                <FiSquare className="text-amber-500" />
                <span>{room.attributes.size}m²</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <FiUsers className="text-amber-500" />
                <span>{room.attributes.maxOccupancy} Guests</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <FiStar className="text-amber-500" />
                <span>{room.attributes.rating}</span>
              </div>
            </div>

            <p className="text-slate-600 mb-8">{room.attributes.description}</p>

            <div className="text-3xl font-bold text-slate-800 mb-8">
              ${room.attributes.pricePerNight}{" "}
              <span className="text-lg font-normal">/ night</span>
            </div>

            <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors duration-300">
              Book Now
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Amenities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* You would map through room amenities here */}
            <div className="flex items-center bg-slate-50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <FiSquare className="text-amber-500" />
              </div>
              <span className="text-slate-700">Free WiFi</span>
            </div>
            {/* Add more amenities as needed */}
          </div>
        </div>
      </div>
    </section>
  );
}
