// app/amenities/page.tsx
import { FiKey, FiCoffee, FiWifi, FiMapPin, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Footer from "@/src/components/footer/footer";

const AMENITY_DETAILS = [
  {
    id: "front-desk",
    title: "24/7 Front Desk Support",
    description:
      "Our reception is available around the clock to ensure all your needs are met at any hour.",
    icon: <FiKey size={48} className="text-amber-500" />,
    details: [
      "Instant check-in/check-out at any time",
      "Multilingual staff available",
      "Luggage storage before check-in and after check-out",
      "Local emergency contact assistance",
      "Mail and package handling services",
    ],
    additionalInfo:
      "Our front desk team undergoes rigorous training to handle all guest requests efficiently and courteously. Whether you need extra towels at 2am or help arranging transportation at dawn, we're here for you.",
  },
  {
    id: "breakfast",
    title: "Complimentary Breakfast",
    description:
      "Start your day right with our freshly prepared morning buffet included in your stay.",
    icon: <FiCoffee size={48} className="text-amber-500" />,
    details: [
      "Served daily from 6:30am to 10:30am",
      "Continental and hot breakfast options",
      "Freshly baked pastries and artisanal breads",
      "Seasonal fruit and healthy options",
      "Special dietary needs accommodated (please notify in advance)",
    ],
    additionalInfo:
      "Our breakfast features locally sourced ingredients whenever possible. The menu rotates daily with chef's specials highlighting regional flavors. Gluten-free, vegan, and other dietary options are available upon request.",
  },
  {
    id: "wifi",
    title: "Reliable High-Speed WiFi",
    description:
      "Stay connected with our premium wireless internet service throughout the property.",
    icon: <FiWifi size={48} className="text-amber-500" />,
    details: [
      "Unlimited bandwidth for all devices",
      "Up to 300Mbps download speeds",
      "Secure encrypted connection",
      "Coverage in all rooms and public areas",
      "Streaming-quality connectivity",
    ],
    additionalInfo:
      "Our enterprise-grade network ensures stable connections even during peak usage times. Business travelers can request priority bandwidth for video conferencing needs. Connection details are provided at check-in.",
  },
  {
    id: "tours",
    title: "Tour Assistance & Recommendations",
    description:
      "Let our concierge team help you discover the best local experiences.",
    icon: <FiMapPin size={48} className="text-amber-500" />,
    details: [
      "Personalized itinerary planning",
      "Exclusive partnerships with trusted tour operators",
      "Skip-the-line ticket arrangements",
      "Private guide bookings",
      "Hidden gem recommendations",
    ],
    additionalInfo:
      "Our staff are local experts who can recommend experiences tailored to your interests. From food tours to adventure activities, we vet all partners to ensure quality and safety. Advance booking recommended for popular tours.",
  },
];

export default function AmenitiesPage() {
  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-16">
          {/* Enhanced Back Link */}
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 mb-12 transition-colors duration-200 group"
          >
            <FiArrowLeft className="mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="border-b border-transparent group-hover:border-blue-600">
              Back to Home
            </span>
          </Link>

          {/* Refined Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <div className="absolute -left-10 top-1/2 w-8 h-0.5 bg-amber-500 transform -translate-y-1/2"></div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4 tracking-tight">
                Our Amenities & Services
              </h1>
              <div className="absolute -right-10 top-1/2 w-8 h-0.5 bg-amber-500 transform -translate-y-1/2"></div>
            </div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
              Discover the thoughtful details that make your stay exceptional
            </p>
          </div>

          {/* Enhanced Amenities Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {AMENITY_DETAILS.map((amenity) => (
              <div
                key={amenity.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative group"
              >
                {/* Decorative accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>

                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="mr-6 p-3 bg-amber-50 rounded-lg border border-amber-100 group-hover:bg-amber-100/30 transition-colors duration-300">
                      {amenity.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800 pt-1">
                      {amenity.title}
                    </h2>
                  </div>

                  <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                    {amenity.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                      <span className="w-4 h-0.5 bg-amber-500 mr-2"></span>
                      Features
                    </h3>
                    <ul className="space-y-3">
                      {amenity.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-500 mr-3 mt-1">•</span>
                          <span className="text-slate-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                      <span className="w-4 h-0.5 bg-amber-500 mr-2"></span>
                      Good to know
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {amenity.additionalInfo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Added CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-xl font-serif text-slate-800 mb-6">
              Ready to experience our hospitality?
            </h3>
            <Link
              href="/booking"
              className="inline-block bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-md font-medium tracking-wide transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
