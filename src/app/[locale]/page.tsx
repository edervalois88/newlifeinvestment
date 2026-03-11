import { setRequestLocale } from 'next-intl/server';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import ServicesGrid from '@/components/ServicesGrid';
import Process from '@/components/Process';
import Concierge from '@/components/Concierge';
import Gateway from '@/components/Gateway';
import SuccessStories from '@/components/SuccessStories';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

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
      <Process />
      <Concierge />
      <Gateway />
      <SuccessStories />
      <FAQ />
      <Contact />
      
      <footer className="py-8 bg-primary border-t border-white/5 text-center">
        <p className="text-white/40 text-sm tracking-wide">
          © {new Date().getFullYear()} New Life Investments — México. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
