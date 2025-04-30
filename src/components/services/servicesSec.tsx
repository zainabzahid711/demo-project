// components/services/ServicesSection.tsx
import { FiScissors, FiUser, FiCalendar } from "react-icons/fi";

const SERVICES = [
  {
    title: "Haircuts & Styling",
    description:
      "Trendy haircuts and professional styling to suit your personality.",
    icon: <FiScissors size={28} />,
  },
  {
    title: "Personalized Consultation",
    description:
      "One-on-one beauty consultations to help you look and feel your best.",
    icon: <FiUser size={28} />,
  },
  {
    title: "Appointment Scheduling",
    description: "Easy and flexible appointment booking at your convenience.",
    icon: <FiCalendar size={28} />,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-900 mb-2">
            Our Services
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Professional beauty services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-teal-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-700">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                {service.title}
              </h3>
              <p className="text-neutral-600 mb-4">{service.description}</p>
              <button className="text-teal-700 hover:text-teal-800 font-medium">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
