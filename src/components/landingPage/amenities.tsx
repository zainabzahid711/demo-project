// components/services/ServicesSection.tsx
import { FiKey, FiCoffee, FiWifi, FiMapPin } from "react-icons/fi";

const SERVICES = [
  {
    title: "24/7 Front Desk Support",
    description:
      "Reception available at all hours to assist with check-ins, inquiries, and guest needs.",
    icon: <FiKey size={28} className="text-amber-500" />,
  },
  {
    title: "Complimentary Breakfast",
    description:
      "Enjoy freshly prepared morning meals included with every standard room booking.",
    icon: <FiCoffee size={28} className="text-amber-500" />,
  },
  {
    title: "Reliable High-Speed WiFi",
    description:
      "Unlimited internet access for all guests — ideal for both leisure and remote work.",
    icon: <FiWifi size={28} className="text-amber-500" />,
  },
  {
    title: "Tour Assistance & Recommendations",
    description:
      "Get help booking trusted local tours or experiences through our partner network — available on request.",
    icon: <FiMapPin size={28} className="text-amber-500" />,
  },
];
export default function ServicesSection() {
  return (
    <section className="py-20 bg-slate-50">
      {" "}
      {/* Soft blue-gray background */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-3">
            Hotel Amenities
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Thoughtful services designed for a seamless stay
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-200 hover:border-amber-100"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-5">{service.description}</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
