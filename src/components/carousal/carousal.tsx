// components/Carousel/Carousel.tsx
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CarouselControls from "./carousalControls";
import CarouselSlide from "./carousalSlide";
import CarouselIndicators from "./carousalIndicators";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const CAROUSEL_DATA = [
    {
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Luxury Suite Experience",
      description:
        "Indulge in our premium suites with breathtaking views and exquisite interiors",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Personalized Concierge Service",
      description:
        "Our dedicated staff ensures every detail of your stay is perfect",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Gourmet Dining Experience",
      description: "World-class cuisine prepared by our award-winning chefs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      title: "Serene Spa Retreat",
      description:
        "Rejuvenate with our luxury spa treatments and wellness programs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80",
      title: "Elegant Event Spaces",
      description: "Host unforgettable events in our sophisticated venues",
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
      <AnimatePresence mode="wait" custom={direction}>
        <CarouselSlide
          key={currentSlide}
          img={CAROUSEL_DATA[currentSlide].image}
          title={CAROUSEL_DATA[currentSlide].title}
          description={CAROUSEL_DATA[currentSlide].description}
          direction={direction}
        />
      </AnimatePresence>

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
