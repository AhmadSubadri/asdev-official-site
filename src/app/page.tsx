import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import Advantages from '@/components/home/Advantages';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import CaseStudyMetrics from '@/components/home/CaseStudyMetrics';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';
import { getSiteSettings } from '@/lib/site-settings';

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <Advantages />
      <PortfolioPreview />
      <CaseStudyMetrics />
      <Testimonials />
      <CTASection whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
