import { setRequestLocale } from 'next-intl/server';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import ServicesGrid from '@/components/ServicesGrid';
import StrategicBlocks from '@/components/StrategicBlocks';
import Immigration from '@/components/Immigration';
import RealEstate from '@/components/RealEstate';
import Academic from '@/components/Academic';
import Process from '@/components/Process';
import Gateway from '@/components/Gateway';
import SuccessStories from '@/components/SuccessStories';
import CTABanner from '@/components/CTABanner';
import FAQ from '@/components/FAQ';
import Concierge from '@/components/Concierge';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default async function Index({params}: {params: Promise<{locale: string}>}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  
  return (
    <main className="min-h-screen bg-primary">
      <Preloader />
      <Header />
      <Hero />
      <About />
      <Expertise />
      <ServicesGrid />
      <StrategicBlocks />
      <Immigration />
      <RealEstate />
      <Academic />
      <Process />
      <Gateway />
      <SuccessStories />
      <CTABanner />
      <FAQ />
      <Concierge />
      <Contact />
      <Footer />
    </main>
  );
}
