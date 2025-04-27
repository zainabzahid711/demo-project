// components/Carousel/CarouselIndicators.tsx
"use client";

const CarouselIndicators = ({
  totalSlides,
  currentSlide,
  goToSlide,
}: {
  totalSlides: number;
  currentSlide: number;
  goToSlide: (index: number) => void;
}) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-2 w-8 rounded-full transition-all duration-300 ${
            currentSlide === index ? "bg-white w-12" : "bg-white/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
