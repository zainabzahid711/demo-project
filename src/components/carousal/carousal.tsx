// components/Carousel/Carousel.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarouselControls from "./carousalControls";
import CarouselSlide from "./carousalSlide";
import CarouselIndicators from "./carousalIndicators";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const CAROUSEL_DATA = [
    {
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Luxury Hair Styling",
      description:
        "Transform your look with our expert color and cutting services",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
      title: "Professional Makeup Artistry",
      description: "Red carpet ready makeup for any occasion",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Spa & Relaxation",
      description: "Rejuvenating treatments for mind and body",
    },
    {
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Nail Artistry",
      description: "Creative designs and luxury manicures",
    },
  ];
  const nextSlide = () => {
    setDirection("right");
    setCurrentSlide((prev) =>
      prev === CAROUSEL_DATA.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentSlide((prev) =>
      prev === 0 ? CAROUSEL_DATA.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? "right" : "left");
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]); // Add currentSlide to dependencies to reset timer on manual navigation

  return (
    <div className="relative h-[100vh] max-h-[800px] w-full overflow-hidden rounded-xl shadow-2xl">
      {/* <AnimatePresence mode="wait" custom={direction}>
        <CarouselSlide
          key={currentSlide}
          img={CAROUSEL_DATA[currentSlide].image}
          title={CAROUSEL_DATA[currentSlide].title}
          description={CAROUSEL_DATA[currentSlide].description}
          direction={direction}
        />
      </AnimatePresence> */}

      <CarouselControls onNext={nextSlide} onPrev={prevSlide} />

      <CarouselIndicators
        totalSlides={CAROUSEL_DATA.length}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
      />
    </div>
  );
};

export default Carousel;
