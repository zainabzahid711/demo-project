"use client";
import React, { useState } from "react";
import whyChoose from "@/public/whyChooseUs.png";
import lessThan from "@/public/less-than.png";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "Industry Experts",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  { title: "Dedicated Team", description: "Ea recusandae nesciunt." },
  { title: "Outcome Focused", description: "Molitia quidem explicabo." },
  {
    title: "High Quality Service",
    description: "Providing excellent services.",
  },
  {
    title: "Cyber Security Expert",
    description: "Advanced security features.",
  },
];

const FeaturesSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(0);

  return (
    <>
      <div className="text-center mb-8 flex flex-col gap-2">
        <h2 className="text-xl">Why Choose Us</h2>
        <h2 className="text-3xl font-bold">We Are Different From Others</h2>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          cupiditate accusantium recusandae soluta explicabo hic!
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-20 md:flex-row items-center justify-between w-[110%]">
        {/* Image Section */}
        <div className="relative flex items-center justify-center">
          {/* Circular Background with Text */}
          <div className="absolute -left-20 bg-[#BA4865] opacity-70 rounded-full w-52 h-52 md:h-80 md:w-80 gap-2 flex flex-col items-center justify-center text-center text-white font-bold">
            <h2 className="md:text-lg px-4 mr-auto text-sm">
              Industry Experts
            </h2>
            <p className="font-thin text-sm">
              Lorem ipsum dolor sit amet adipisicing elit. Quas dolores nam
              ipsam odit quod fuga numquam hic quo!
            </p>
          </div>

          {/* Image */}
          <img
            src={whyChoose.src} // Replace with your image path
            alt="Person working on a laptop"
            className="relative left-24 md:left-32 -z-10 rounded-full w-52 h-52 md:h-80 md:w-80 object-cover shadow-lg opacity-80"
          />
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-6 w-[90%] md:w-[40%] flex-end">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setSelectedFeature(index)}
              className={`flex items-center justify-between p-3 rounded-3xl transition ${
                selectedFeature === index
                  ? "bg-[#BA4865] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {/* Icon */}
              <img
                src={lessThan.src}
                alt="Less than icon"
                className="w-3 h-3 mr-4"
              />
              {/* Title */}
              <span className="font-semibold flex-end pr-5">
                {feature.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* </div> */}
      {/* </section> */}
    </>
  );
};

export default FeaturesSection;
