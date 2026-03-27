import { useLenis } from '../../hooks/useLenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import FeaturedMenuSection from './components/FeaturedMenuSection';
import CateringSection from './components/CateringSection';
import DrinksSection from './components/DrinksSection';
import GiftCardSection from './components/GiftCardSection';
import FullsizeSection from './components/FullsizeSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

export default function Home() {
  // Initialize Lenis smooth scroll + GSAP ScrollTrigger integration
  useLenis();

  return (
    <main className="w-full flex-1 min-h-screen bg-cream">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <FeaturedMenuSection />
      <CateringSection />
      <DrinksSection />
      <GiftCardSection />
      <FullsizeSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
