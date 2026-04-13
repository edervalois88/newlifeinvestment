import { setRequestLocale } from 'next-intl/server';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServicesGrid from '@/components/ServicesGrid';
import SuccessStories from '@/components/SuccessStories';
import Expertise from '@/components/Expertise';
import Immigration from '@/components/Immigration';
import RealEstate from '@/components/RealEstate';
import Academic from '@/components/Academic';
import Concierge from '@/components/Concierge';
import Process from '@/components/Process';
import StrategicBlocks from '@/components/StrategicBlocks';
import Gateway from '@/components/Gateway';
import FAQ from '@/components/FAQ';
import CTABanner from '@/components/CTABanner';
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

      {/* Foundation */}
      <Hero />
      <About />

      {/* Main Services Overview */}
      <ServicesGrid />

      {/* Social Proof Early */}
      <SuccessStories />

      {/* Why Choose NLI */}
      <Expertise />

      {/* Detailed Service Sections */}
      <Immigration />
      <RealEstate />
      <Academic />
      <Concierge />

      {/* Journey & Process */}
      <Process />

      {/* Additional Opportunities */}
      <StrategicBlocks />

      {/* Platform Benefits */}
      <Gateway />

      {/* FAQ & CTA */}
      <FAQ />
      <CTABanner />
      <Contact />

      <Footer />
    </main>
  );
}
