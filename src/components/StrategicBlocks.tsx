'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import {
  BriefcaseBusiness, Building2, GraduationCap, Home, Plane,
  Scale, Sparkles, TrendingUp,
  HeartPulse, Sofa, Wrench, Utensils, Cpu, ArrowRight
} from 'lucide-react';

const serviceItems = [
  { key: 'immigration', icon: Plane },
  { key: 'relocation', icon: BriefcaseBusiness },
  { key: 'realEstate', icon: Home },
  { key: 'franchise', icon: Building2 },
  { key: 'education', icon: GraduationCap }
];

const franchiseSteps = ['step1', 'step2', 'step3', 'step4', 'step5'];

const franchiseBrands = [
  { key: 'brand1', category: 'health' },
  { key: 'brand2', category: 'home' },
  { key: 'brand3', category: 'services' },
  { key: 'brand4', category: 'food' },
  { key: 'brand5', category: 'tech' },
  { key: 'brand6', category: 'services' }
];

const categoryKeys = ['all', 'food', 'health', 'home', 'services', 'tech'];

const categoryMeta: Record<string, { icon: React.ElementType; gradient: string }> = {
  health:   { icon: HeartPulse, gradient: 'from-emerald-900/60 via-emerald-800/30 to-transparent' },
  home:     { icon: Sofa,       gradient: 'from-amber-900/60 via-amber-800/30 to-transparent' },
  services: { icon: Wrench,     gradient: 'from-sky-900/60 via-sky-800/30 to-transparent' },
  food:     { icon: Utensils,   gradient: 'from-rose-900/60 via-rose-800/30 to-transparent' },
  tech:     { icon: Cpu,        gradient: 'from-violet-900/60 via-violet-800/30 to-transparent' },
};

export default function StrategicBlocks() {
  const t = useTranslations('StrategicBlocks');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleRequestInfo = (brandName: string) => {
    window.dispatchEvent(
      new CustomEvent('franchise-request-info', {
        detail: { subject: `${t('franchise.requestInfo')}: ${brandName}` }
      })
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredBrands = useMemo(() => {
    if (selectedCategory === 'all') return franchiseBrands;
    return franchiseBrands.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="strategic-blocks" className="py-24 bg-primary border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl space-y-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4">{t('title')}</h2>
          <p className="text-white/65 max-w-3xl mx-auto font-light">{t('subtitle')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-elegant rounded-3xl p-8"
          >
            <h3 className="text-2xl font-playfair text-white mb-6">{t('services.title')}</h3>
            <div className="space-y-4">
              {serviceItems.map(({ key, icon: Icon }) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-secondary/40 p-4 hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="text-white font-medium">{t(`services.items.${key}.title`)}</div>
                      <p className="text-white/65 text-sm font-light mt-1 leading-relaxed">{t(`services.items.${key}.desc`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="glass-elegant rounded-3xl p-8">
              <h3 className="text-2xl font-playfair text-white mb-6">{t('competitiveEdge.title')}</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 p-4 bg-secondary/40">
                  <Scale className="w-5 h-5 text-accent mb-3" strokeWidth={1.7} />
                  <h4 className="text-white font-medium mb-1">{t('competitiveEdge.integrityTitle')}</h4>
                  <p className="text-white/65 text-sm font-light">{t('competitiveEdge.integrityDesc')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 p-4 bg-secondary/40">
                  <TrendingUp className="w-5 h-5 text-accent mb-3" strokeWidth={1.7} />
                  <h4 className="text-white font-medium mb-1">{t('competitiveEdge.experienceTitle')}</h4>
                  <p className="text-white/65 text-sm font-light">{t('competitiveEdge.experienceDesc')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 p-4 bg-secondary/40">
                  <Sparkles className="w-5 h-5 text-accent mb-3" strokeWidth={1.7} />
                  <h4 className="text-white font-medium mb-1">{t('competitiveEdge.teamTitle')}</h4>
                  <p className="text-white/65 text-sm font-light">{t('competitiveEdge.teamDesc')}</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-elegant rounded-3xl p-6">
                <h4 className="text-accent font-playfair text-xl mb-2">{t('mission.title')}</h4>
                <p className="text-white/70 text-sm font-light leading-relaxed">{t('mission.desc')}</p>
              </div>
              <div className="glass-elegant rounded-3xl p-6">
                <h4 className="text-accent font-playfair text-xl mb-2">{t('vision.title')}</h4>
                <p className="text-white/70 text-sm font-light leading-relaxed">{t('vision.desc')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Franchise Pipeline ── */}
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Header + filter tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70 mb-2">{t('franchise.title')}</p>
              <h3 className="text-3xl md:text-4xl font-playfair text-white leading-tight">
                {t('franchise.title')}
              </h3>
            </div>

            {/* Category pill tabs */}
            <div className="flex flex-wrap gap-2">
              {categoryKeys.map((category) => {
                const isActive = selectedCategory === category;
                const meta = category !== 'all' ? categoryMeta[category] : null;
                const Icon = meta?.icon;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase border transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-[#001A33] border-accent shadow-[0_0_18px_rgba(197,160,89,0.35)]'
                        : 'border-white/15 text-white/60 hover:border-accent/50 hover:text-accent bg-secondary/30'
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" strokeWidth={2} />}
                    {t(`franchise.categories.${category}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredBrands.map((brand, idx) => {
                const meta = categoryMeta[brand.category];
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={brand.key}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.32, delay: idx * 0.06 }}
                    className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-secondary/40 hover:border-accent/40 transition-colors duration-300 premium-card premium-card--soft"
                  >
                    {/* Card header — gradient + icon */}
                    <div className={`relative flex items-center justify-center h-36 bg-gradient-to-b ${meta.gradient} border-b border-white/5`}>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.6)_0%,_transparent_70%)]" />
                      <Icon className="w-12 h-12 text-accent/80 group-hover:text-accent transition-colors duration-300" strokeWidth={1.2} />
                      {/* Category badge */}
                      <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.28em] text-accent/70 font-semibold">
                        {t(`franchise.categories.${brand.category}`)}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-6">
                      <h4 className="text-xl font-playfair text-white mb-3 leading-snug">
                        {t(`franchise.featured.${brand.key}.name`)}
                      </h4>
                      <p className="text-white/60 text-sm font-light leading-relaxed flex-1">
                        {t(`franchise.featured.${brand.key}.desc`)}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleRequestInfo(t(`franchise.featured.${brand.key}.name`))}
                        className="mt-6 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-widest uppercase text-accent hover:gap-3 transition-all duration-200"
                      >
                        {t('franchise.requestInfo')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Process steps — compact row below cards */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
            {franchiseSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/8 bg-secondary/30 px-4 py-3">
                <span className="text-[9px] text-accent/60 tracking-[0.25em] font-bold">0{index + 1}</span>
                <p className="text-white/70 text-xs mt-1 leading-snug">{t(`franchise.process.${step}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
