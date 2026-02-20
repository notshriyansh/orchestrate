import Navbar from "../../components/Navbar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <CTASection />
      <Footer />
    </div>
  );
}
