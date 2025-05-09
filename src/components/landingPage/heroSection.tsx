// components/hero/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import Carousel from "../carousal/carousal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative">
      <Carousel />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center text-white max-w-2xl px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg"
          ></motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl mb-8 drop-shadow-md"
          >
            Relaxed spaces, designed for ease
          </motion.p>
          <motion.div variants={itemVariants}>
            {/* <Link
              href="/booking"
              className="inline-flex items-center px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 gap-2"
            >
              Book Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
