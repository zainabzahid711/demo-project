// app/page.tsx
import Header from "../components/header/header";
import HeroSection from "../components/hero/heroSection";
import ServicesSection from "../components/services/servicesSec";
// import CTASection from "@/components/cta/CTASection";
import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-teal-50">
      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        {/* <CTASection /> */}
      </main>

      <Footer />
    </div>
  );
}
