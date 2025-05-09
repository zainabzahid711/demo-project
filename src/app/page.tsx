// app/page.tsx
import Header from "../components/header/header";
import HeroSection from "../components/landingPage/heroSection";
import ServicesSection from "../components/landingPage/amenities";
// import CTASection from "@/components/cta/CTASection";
import Footer from "../components/footer/footer";
import RoomShowcase from "../components/landingPage/roomShowCase";
import TestimonialCarousel from "../components/landingPage/testimonial";
import LocationMap from "../components/landingPage/locationMap";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-teal-50">
      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        {/* <CTASection /> */}
        <RoomShowcase />
        <TestimonialCarousel />
        <LocationMap />
      </main>

      <Footer />
    </div>
  );
}
