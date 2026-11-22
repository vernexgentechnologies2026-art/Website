import { BookingSection } from '@/components/sections/BookingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

/** Homepage — section order exactly as in the approved mockup. */
export default function HomePage() {
  useDocumentMeta('home');

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <ResultsSection />
      <PricingSection />
      <ProcessSection />
      <TestimonialsSection />
      <BookingSection />
      <FAQSection />
    </>
  );
}
