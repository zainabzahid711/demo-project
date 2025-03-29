"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import whyChoose from "@/public/whyChooseUs.png";
import lessThan from "@/public/less-than.png";

interface Feature {
  id: number;
  title: string;
  description: string;
}

// Default static features (fallback)
const defaultFeatures: Feature[] = [
  {
    id: 1,
    title: "Industry Experts",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  { id: 2, title: "Dedicated Team", description: "Ea recusandae nesciunt." },
  { id: 3, title: "Outcome Focused", description: "Molitia quidem explicabo." },
  {
    id: 4,
    title: "High Quality Service",
    description: "Providing excellent services.",
  },
  {
    id: 5,
    title: "Cyber Security Expert",
    description: "Advanced security features.",
  },
];
interface ApiFeature {
  id: number;
  attributes: {
    title: string;
    description: string;
  };
}

const FeaturesSection: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>(defaultFeatures);
  const [selectedFeature, setSelectedFeature] = useState<number>(
    defaultFeatures[0].id
  );

  useEffect(() => {
    fetch("https://wilful-juditha-tilde-2e2e9688.koyeb.app/api/features")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data?.data) throw new Error("No data received");
        const formattedFeatures = data.data.map((item: ApiFeature) => ({
          id: item.id,
          title: item.attributes.title,
          description: item.attributes.description,
        }));
        setFeatures(formattedFeatures);
        setSelectedFeature(formattedFeatures[0]?.id || defaultFeatures[0].id);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        // Optionally show error to user
      });
  }, []);

  return (
    <div className="text-center mb-8 flex flex-col gap-2">
      <h2 className="text-xl">Why Choose Us</h2>
      <h2 className="text-3xl font-bold">We Are Different From Others</h2>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cupiditate
        accusantium recusandae soluta explicabo hic!
      </p>

      {/* Content Section */}
      <div className="flex flex-col gap-20 md:flex-row items-center justify-between w-[110%]">
        {/* Image Section */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -left-20 bg-[#BA4865] opacity-70 rounded-full w-52 h-52 md:h-80 md:w-80 flex flex-col items-center justify-center text-center text-white font-bold p-4">
            <h2 className="md:text-lg text-sm">
              {
                features.find((feature) => feature.id === selectedFeature)
                  ?.title
              }
            </h2>
            <p className="font-thin text-sm">
              {
                features.find((feature) => feature.id === selectedFeature)
                  ?.description
              }
            </p>
          </div>

          {/* Display Image */}
          <Image
            src={whyChoose}
            alt="Person working on a laptop"
            className="relative left-24 md:left-32 -z-10 rounded-full w-52 h-52 md:h-80 md:w-80 object-cover shadow-lg opacity-80"
          />
        </div>

        {/* Feature Buttons */}
        <div className="flex flex-col gap-6 w-[90%] md:w-[40%] flex-end">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature.id)}
              className={`flex items-center justify-between p-3 rounded-3xl transition ${
                selectedFeature === feature.id
                  ? "bg-[#BA4865] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              <Image
                src={lessThan}
                alt="Less than icon"
                className="w-3 h-3 mr-4"
              />
              <span className="font-semibold flex-end pr-5">
                {feature.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
