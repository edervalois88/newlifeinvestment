'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Store, Plane, Home, GraduationCap, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';

const icons = {
  immigration: Plane,
  realEstate: Home,
  academic: GraduationCap,
  franchise: Store,
  brand: Building2
};

export default function ServicesGrid() {
  const t = useTranslations('Services');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<'immigration' | 'franchise' | 'brand' | null>(null);

  const services = [
    { key: 'immigration', icon: 'immigration' },
    { key: 'realEstate', icon: 'realEstate' },
    { key: 'academic', icon: 'academic' },
    { key: 'franchise', icon: 'franchise' },
    { key: 'brand', icon: 'brand' }
  ] as const;

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveService(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <section id="services" className="py-24 bg-primary relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4 drop-shadow-md">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {services.map((service, index) => {
            const Icon = icons[service.icon as keyof typeof icons];
            
            return (
              <motion.div
                key={service.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative premium-card premium-card--strong group block p-8 rounded-2xl glass-elegant transition-all duration-500 hover:border-secondary hover:shadow-[0_0_40px_rgba(0,18,36,0.5)] border-white/5 cursor-pointer h-full"
              >
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="halo"
                      className="absolute inset-0 z-0 bg-secondary/20 rounded-2xl border border-secondary shadow-[0_0_30px_rgba(0,18,36,0.3)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className="relative z-10">
                  <div className="icon-shell w-14 h-14 rounded-full border flex items-center justify-center mb-6 group-hover:scale-110">
                    <Icon strokeWidth={1.5} className="icon-glyph w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-playfair text-white mb-4">
                    {t(`${service.key}.title`)}
                  </h3>
                  
                  <p className="text-white/60 font-light leading-relaxed">
                    {t(`${service.key}.desc`)}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveService(service.key)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-secondary hover:text-[#8f6a2f] transition-colors"
                  >
                    {t('detailsCta')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl glass-elegant p-8 border border-accent/30 relative"
            >
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 hover:border-accent/60 inline-flex items-center justify-center text-accent"
                aria-label={t('close')}
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-3xl font-playfair text-accent mb-3 pr-12">
                {t(`${activeService}.title`)}
              </h3>

              <p className="text-white/70 leading-relaxed mb-6">
                {t(`${activeService}.longDesc`)}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="rounded-xl bg-secondary/40 border border-white/10 px-4 py-3 text-sm text-white/80 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#8f6a2f]" />
                    <span>{t(`${activeService}.step${step}`)}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={activeService === 'franchise' ? '/franchises' : '/#contact'}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-[#fff] font-semibold tracking-wide hover:opacity-90 transition-opacity"
                  onClick={() => setActiveService(null)}
                >
                  {activeService === 'franchise' ? t('franchisePageCta') : t('contactCta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveService(null)}
                  className="px-5 py-3 rounded-xl border border-white/10 text-white/70 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
