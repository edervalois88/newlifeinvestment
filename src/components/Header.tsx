'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LogoSvg from './LogoSvg';

type Locale = 'en' | 'ar';

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
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const activeNavItem = navItems.find((item) => isNavItemActive(item)) ?? 'home';

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
            <LogoSvg className="h-8 sm:h-10 w-auto max-w-[160px] sm:max-w-[200px]" aria-label={t('logoAlt')} />
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
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle header-icon-btn hover:text-[#8f6a2f] hover:bg-white/5 transition-colors" aria-label="Select language">
                <Globe className="w-5 h-5" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-60 menu p-2 shadow bg-primary rounded-box w-40 border border-accent/20 mt-2 text-neutral">
                {[
                  { code: 'en', flag: '🇺🇸', label: t('languageEn') },
                  { code: 'ar', flag: '🇦🇪', label: t('languageAr') }
                ].map((lang) => (
                  <li key={lang.code}>
                    <button onClick={() => handleLanguageChange(lang.code as 'en' | 'ar')} className="flex items-center gap-2 hover:text-accent active:bg-accent/20">
                      <span className="text-base">{lang.flag}</span>
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="xl:hidden btn btn-ghost btn-circle btn-sm sm:btn-md header-icon-btn hover:text-[#8f6a2f] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 xl:hidden pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 pt-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/12 px-3 py-1.5 shadow-[0_6px_18px_rgba(143,106,47,0.12)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8f6a2f]" />
            <span className="text-xs tracking-wide font-medium text-accent">{t(activeNavItem)}</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Outside header stacking context */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-0 top-16 sm:top-20 bg-primary z-90 xl:hidden flex flex-col p-6 sm:p-8 gap-6 sm:gap-8 border-l border-white/5 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3">
          <div className="text-[10px] uppercase tracking-[0.22em] text-accent/80">Navigation</div>
          <div className="mt-1 text-lg font-playfair text-accent">{t(activeNavItem)}</div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getNavHref(item)}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isNavItemActive(item) ? 'page' : undefined}
              className={`rounded-xl px-4 py-3 border transition-all ${isNavItemActive(item) ? 'border-accent/55 bg-accent/12 text-[#8f6a2f] shadow-[0_8px_24px_rgba(143,106,47,0.16)]' : 'border-white/10 text-neutral hover:text-accent hover:border-accent/35'}`}
            >
              <span className="inline-flex items-center gap-2 text-xl sm:text-2xl font-playfair">
                <span
                  className={`inline-block w-2 h-2 rounded-full bg-[#8f6a2f] transition-opacity duration-300 ${isNavItemActive(item) ? 'opacity-100' : 'opacity-35'}`}
                />
                {t(item)}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-white/5 pt-8">
          <p className="text-xs uppercase tracking-widest text-neutral/40 mb-4 font-bold">{t('languageLabel')}</p>
          <div className="flex gap-3">
            {[
              { code: 'es', flag: '🇪🇸', label: t('languageEs') },
              { code: 'en', flag: '🇺🇸', label: t('languageEn') },
              { code: 'ar', flag: '🇦🇪', label: t('languageAr') }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'en' | 'ar')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm font-medium uppercase text-neutral hover:border-accent hover:text-accent transition-all"
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
