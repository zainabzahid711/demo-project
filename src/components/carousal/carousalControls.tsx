// components/Carousel/CarouselControls.tsx
import { FiArrowRight } from "react-icons/fi";

const CarouselControls = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full shadow-lg hover:bg-white/30 backdrop-blur-sm transition-all group"
        aria-label="Previous slide"
      >
        <FiArrowRight className="rotate-180 text-white text-2xl group-hover:scale-125 transition-transform" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full shadow-lg hover:bg-white/30 backdrop-blur-sm transition-all group"
        aria-label="Next slide"
      >
        <FiArrowRight className="text-white text-2xl group-hover:scale-125 transition-transform" />
      </button>
    </>
  );
};

export default CarouselControls;
