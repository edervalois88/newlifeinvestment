'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (locale: 'en' | 'es' | 'ar') => {
    router.replace(pathname, { locale });
    setIsMobileMenuOpen(false);
  };

  const navItems = ['about', 'services', 'franchises', 'process', 'concierge', 'gateway', 'contact'];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-elegant border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="relative z-20 flex items-center transition-transform hover:scale-105">
          <Image 
            src="/logo.jpg" 
            alt="New Life Investments Logo" 
            width={180} 
            height={50} 
            priority
            className="object-contain h-10 w-auto invert brightness-150 contrast-125 mix-blend-screen" 
          />
        </Link>
        
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={`#${item}`}
              className="text-xs lg:text-sm font-medium text-neutral/70 hover:text-primary transition-colors duration-300 uppercase tracking-widest"
            >
              {t(item)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Selector Desktop */}
          <div className="hidden md:block dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-accent hover:bg-white/5">
              <Globe className="w-5 h-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[60] menu p-2 shadow bg-primary rounded-box w-32 border border-accent/20 mt-2 font-inter text-neutral">
              {[
                { code: 'es', label: 'Español' },
                { code: 'en', label: 'English' },
                { code: 'ar', label: 'العربية' }
              ].map((lang) => (
                <li key={lang.code}>
                  <button onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'ar')} className="hover:text-accent active:bg-accent/20">
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden btn btn-ghost btn-circle text-accent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 top-20 bg-primary z-[45] xl:hidden flex flex-col p-8 gap-8 border-l border-white/5"
      >
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link 
              key={item} 
              href={`#${item}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-playfair text-neutral hover:text-accent transition-colors"
            >
              {t(item)}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-white/5 pt-8">
          <p className="text-xs uppercase tracking-widest text-neutral/40 mb-4 font-bold">Idioma / Language</p>
          <div className="flex gap-4">
            {['es', 'en', 'ar'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang as any)}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium uppercase text-neutral hover:border-accent hover:text-accent transition-all"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
