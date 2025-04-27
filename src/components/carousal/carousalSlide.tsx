// components/Carousel/CarouselSlide.tsx
"use client";

import { motion } from "framer-motion";

const CarouselSlide = ({
  img,
  title,
  description,
  direction,
}: {
  img: string;
  title: string;
  description: string;
  direction: "left" | "right";
}) => {
  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0.5,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0.5,
      scale: 0.95,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0"
    >
      <div className="relative w-full h-full">
        <img
          src={img}
          alt="Salon service"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 text-center px-8 text-white">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselSlide;
