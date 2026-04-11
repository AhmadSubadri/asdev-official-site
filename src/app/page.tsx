import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import Advantages from "@/components/home/Advantages";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CTASection from "@/components/home/CTASection";
import Testimonials from "@/components/home/Testimonials";
import Section from "@/components/shared/Section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <Advantages />
      <PortfolioPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
