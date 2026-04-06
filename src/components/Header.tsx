'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

type Locale = 'en' | 'es' | 'ar';

const locales: ReadonlyArray<{ code: Locale; label: string }> = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' }
];

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const isHomeRoute = pathname === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (locale: Locale) => {
    router.replace(pathname, { locale });
    setIsMobileMenuOpen(false);
  };

  const navItems = ['home', 'about', 'services', 'franchises', 'process', 'gateway', 'contact'];

  const getNavHref = (item: string) => {
    if (item === 'home') return '/';
    if (item === 'about') return '/about';
    if (item === 'services') return '/services';
    if (item === 'franchises') return '/franchises';
    if (item === 'process') return '/process';
    if (item === 'gateway') return '/gateway';
    if (item === 'contact') return '/contact';
    return '/';
  };

  const isNavItemActive = (item: string) => {
    const href = getNavHref(item);
    return pathname === href;
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow || '';
    }

    return () => {
      document.body.style.overflow = previousOverflow || '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass-elegant border-b border-white/5"
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/"
            aria-current={isHomeRoute ? 'page' : undefined}
            className={`relative z-20 flex items-center transition-transform hover:scale-105 ${isHomeRoute ? 'after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-8 after:rounded-full after:bg-[#8f6a2f]' : ''}`}
          >
            <Image
              src="/logo.jpg"
              alt={t('logoAlt')}
              width={180}
              height={50}
              priority
              className="object-contain h-8 sm:h-10 w-auto site-logo"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={getNavHref(item)}
                aria-current={isNavItemActive(item) ? 'page' : undefined}
                className={`relative text-xs lg:text-sm font-medium transition-colors duration-300 uppercase tracking-widest ${isNavItemActive(item) ? 'text-[#8f6a2f]' : 'text-neutral/70 hover:text-accent'}`}
              >
                {t(item)}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-[#8f6a2f] transition-all duration-300 ${isNavItemActive(item) ? 'w-5 opacity-100' : 'w-0 opacity-0'}`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Selector Desktop */}
            <div className="hidden md:block dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-secondary hover:text-[#8f6a2f] hover:bg-white/5 transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-60 menu p-2 shadow bg-primary rounded-box w-32 border border-accent/20 mt-2 text-neutral">
                {[
                  { code: 'es', label: t('languageEs') },
                  { code: 'en', label: t('languageEn') },
                  { code: 'ar', label: t('languageAr') }
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
              className="xl:hidden btn btn-ghost btn-circle btn-sm sm:btn-md text-secondary hover:text-[#8f6a2f] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Outside header stacking context */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 top-16 sm:top-20 bg-primary z-90 xl:hidden flex flex-col p-6 sm:p-8 gap-6 sm:gap-8 border-l border-white/5 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="flex flex-col gap-4 sm:gap-6 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getNavHref(item)}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isNavItemActive(item) ? 'page' : undefined}
              className={`text-xl sm:text-2xl font-playfair transition-colors ${isNavItemActive(item) ? 'text-[#8f6a2f]' : 'text-neutral hover:text-accent'}`}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full bg-[#8f6a2f] transition-opacity duration-300 ${isNavItemActive(item) ? 'opacity-100' : 'opacity-0'}`}
                />
                {t(item)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-white/5 pt-8">
          <p className="text-xs uppercase tracking-widest text-neutral/40 mb-4 font-bold">{t('languageLabel')}</p>
          <div className="flex gap-4">
            {[
              { code: 'es', label: t('languageEs') },
              { code: 'en', label: t('languageEn') },
              { code: 'ar', label: t('languageAr') }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'ar')}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium uppercase text-neutral hover:border-accent hover:text-accent transition-all"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
