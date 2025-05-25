"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import { CalendarDays, MapPin, Users } from "lucide-react";

type TabKey = "rooms" | "dining" | "experiences";

interface TabContent {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("rooms");

  const tabData: Record<TabKey, TabContent> = {
    rooms: {
      title: "Experience Unmatched Luxury",
      description:
        "Discover our award-winning resort with breathtaking ocean views and world-class amenities",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format",
      buttonText: "Book Your Stay",
    },
    dining: {
      title: "Exquisite Culinary Journey",
      description:
        "Indulge in our Michelin-starred restaurants with panoramic views",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&auto=format",
      buttonText: "Reserve a Table",
    },
    experiences: {
      title: "Unforgettable Experiences",
      description:
        "Create memories with our curated selection of luxury activities",
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1800&auto=format",
      buttonText: "Explore Experiences",
    },
  };

  const currentTab = tabData[activeTab];

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentTab.image}
          alt={currentTab.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-grow flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {currentTab.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {currentTab.description}
              </p>
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors">
                {currentTab.buttonText}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="bg-white shadow-2xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex border-b mb-6">
              {(Object.keys(tabData) as TabKey[]).map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 font-medium ${
                    activeTab === tab
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-gray-500 hover:text-amber-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
