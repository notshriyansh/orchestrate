import Navbar from "../../components/Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CTASection />
      <Footer />
    </div>
  );
}
