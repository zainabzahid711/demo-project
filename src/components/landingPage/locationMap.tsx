// components/location/LocationMap.tsx
import { FiMapPin, FiCompass, FiShoppingBag, FiCamera } from "react-icons/fi";

const ATTRACTIONS = [
  {
    name: "City Center",
    distance: "0.5 km",
    icon: <FiCompass className="text-amber-500" />,
    description: "5-minute walk to main shopping and dining district",
  },
  {
    name: "Museum of Modern Art",
    distance: "1.2 km",
    icon: <FiCamera className="text-amber-500" />,
    description: "Renowned contemporary art collections",
  },
  {
    name: "Central Park",
    distance: "2.3 km",
    icon: <FiMapPin className="text-amber-500" />,
    description: "Lush green space perfect for morning runs",
  },
  {
    name: "Luxury Boutiques",
    distance: "0.8 km",
    icon: <FiShoppingBag className="text-amber-500" />,
    description: "High-end shopping district",
  },
];

export default function LocationMap() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-800 mb-3">
              Prime Location
            </h2>
            <p className="text-slate-600 text-lg mb-8">
              Situated in the heart of the city with easy access to major
              attractions
            </p>

            <div className="space-y-6">
              {ATTRACTIONS.map((attraction, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    {attraction.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {attraction.name}{" "}
                      <span className="text-sm font-normal text-amber-600">
                        ({attraction.distance})
                      </span>
                    </h3>
                    <p className="text-slate-600">{attraction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-96 bg-slate-200 rounded-xl overflow-hidden relative">
            {/* Map placeholder - replace with actual map component like Google Maps */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-slate-500">Interactive Map Here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
