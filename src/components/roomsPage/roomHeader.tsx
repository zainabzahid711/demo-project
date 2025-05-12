// src/components/room/RoomHeader.tsx
import { FiStar, FiSquare, FiUsers } from "react-icons/fi";
import { Room } from "@/src/lib/types/booking";

export default function RoomHeader({ room }: { room: Room }) {
  return (
    <div className="relative -mt-16 z-10 mb-12 w-full">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800">
              {room.attributes.name}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-amber-500">
                <FiStar className="fill-current" />
                <span className="ml-1 text-slate-700">
                  {room.attributes.rating}
                </span>
              </div>
              <div className="flex items-center text-slate-600">
                <FiSquare className="mr-2" />
                <span>{room.attributes.size}m²</span>
              </div>
              <div className="flex items-center text-slate-600">
                <FiUsers className="mr-2" />
                <span>{room.attributes.capacity} guests</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-800">
              ${room.attributes.price}
              <span className="text-base font-normal text-slate-500">
                /night
              </span>
            </div>
            <button className="mt-4 px-6 py-3 bg-slate-800 hover:bg-slate-950 text-white rounded-lg transition-colors w-full md:w-auto">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
