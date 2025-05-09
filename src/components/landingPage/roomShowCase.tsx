// components/rooms/RoomShowcase.tsx
import { FiStar, FiSquare, FiUsers } from "react-icons/fi";
import Image from "next/image";

const ROOMS = [
  {
    name: "Deluxe Suite",
    description: "Spacious retreat with premium amenities and city views",
    price: 299,
    size: 45,
    capacity: 2,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    // Photo by João Jesus from Pexels
  },
  {
    name: "Executive King",
    description: "Sophisticated workspace with ergonomic furnishings",
    price: 349,
    size: 55,
    capacity: 2,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    // Photo by Pixabay from Pexels
  },
  {
    name: "Presidential Suite",
    description: "Ultimate luxury experience with separate living area",
    price: 599,
    size: 85,
    capacity: 4,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    // Photo by Max Rahubovskiy from Pexels
  },
];

export default function RoomShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-3">
            Our Rooms & Suites
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Thoughtfully designed spaces for every need
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ROOMS.map((room, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-slate-200 relative">
                <Image
                  src={room.image}
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-semibold text-white">
                    {room.name}
                  </h3>
                  <p className="text-amber-400 font-bold">
                    ${room.price}
                    <span className="text-white text-sm font-normal">
                      /night
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white">
                <p className="text-slate-600 mb-4">{room.description}</p>

                <div className="flex justify-between text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-1">
                    <FiSquare className="text-amber-500" />
                    <span>{room.size}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiUsers className="text-amber-500" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiStar className="text-amber-500" />
                    <span>{room.rating}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
