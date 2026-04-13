'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import {
  BriefcaseBusiness, Building2, GraduationCap, Home, Plane,
  Scale, Sparkles, TrendingUp,
  HeartPulse, Sofa, Wrench, Utensils, Cpu, ArrowRight, Search, X
} from 'lucide-react';
import franchiseData from '@/data/franchises.json';
import FranchiseAvatar from './FranchiseAvatar';

const serviceItems = [
  { key: 'immigration', icon: Plane },
  { key: 'relocation', icon: BriefcaseBusiness },
  { key: 'realEstate', icon: Home },
  { key: 'franchise', icon: Building2 },
  { key: 'education', icon: GraduationCap }
];

const franchiseSteps = ['step1', 'step2', 'step3', 'step4', 'step5'];

const categoryMeta: Record<string, { icon: React.ElementType; gradientDark: string; gradientLight: string; colorDark: string; colorLight: string }> = {
  'health':           { icon: HeartPulse, gradientDark: 'dark:from-emerald-900/60 dark:via-emerald-800/30', gradientLight: 'from-emerald-100 via-emerald-50', colorDark: 'dark:text-emerald-400', colorLight: 'text-emerald-600' },
  'home':             { icon: Sofa,       gradientDark: 'dark:from-amber-900/60 dark:via-amber-800/30', gradientLight: 'from-amber-100 via-amber-50', colorDark: 'dark:text-amber-400', colorLight: 'text-amber-600' },
  'home-services':    { icon: Sofa,       gradientDark: 'dark:from-amber-900/60 dark:via-amber-800/30', gradientLight: 'from-amber-100 via-amber-50', colorDark: 'dark:text-amber-400', colorLight: 'text-amber-600' },
  'services':         { icon: Wrench,     gradientDark: 'dark:from-sky-900/60 dark:via-sky-800/30', gradientLight: 'from-sky-100 via-sky-50', colorDark: 'dark:text-sky-400', colorLight: 'text-sky-600' },
  'food':             { icon: Utensils,   gradientDark: 'dark:from-rose-900/60 dark:via-rose-800/30', gradientLight: 'from-rose-100 via-rose-50', colorDark: 'dark:text-rose-400', colorLight: 'text-rose-600' },
  'tech':             { icon: Cpu,        gradientDark: 'dark:from-violet-900/60 dark:via-violet-800/30', gradientLight: 'from-violet-100 via-violet-50', colorDark: 'dark:text-violet-400', colorLight: 'text-violet-600' },
  'beauty':           { icon: Sparkles,   gradientDark: 'dark:from-pink-900/60 dark:via-pink-800/30', gradientLight: 'from-pink-100 via-pink-50', colorDark: 'dark:text-pink-400', colorLight: 'text-pink-600' },
  'recreation':       { icon: Sparkles,   gradientDark: 'dark:from-indigo-900/60 dark:via-indigo-800/30', gradientLight: 'from-indigo-100 via-indigo-50', colorDark: 'dark:text-indigo-400', colorLight: 'text-indigo-600' },
  'automotive':       { icon: Wrench,     gradientDark: 'dark:from-slate-900/60 dark:via-slate-800/30', gradientLight: 'from-slate-100 via-slate-50', colorDark: 'dark:text-slate-400', colorLight: 'text-slate-600' },
};

export default function StrategicBlocks() {
  const t = useTranslations('StrategicBlocks');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    let result = franchiseData.franchises;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.shortName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

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
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent/70 mb-2">{t('franchise.title')}</p>
            <h3 className="text-3xl md:text-4xl font-playfair text-white leading-tight mb-8">
              {t('franchise.title')}
            </h3>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 dark:text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search franchises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/40 dark:bg-secondary/40 border border-white/10 dark:border-white/10 rounded-2xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/40 focus:outline-none focus:border-accent/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category pill tabs */}
            <div className="flex flex-wrap gap-2">
              {franchiseData.categories.map((category) => {
                const isActive = selectedCategory === category.key;
                const meta = category.key !== 'all' ? categoryMeta[category.key] : null;
                const Icon = meta?.icon;
                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setSelectedCategory(category.key)}
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase border transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-white dark:text-white border-accent shadow-[0_0_24px_rgba(197,160,89,0.45)] font-bold'
                        : 'border-gray-300 dark:border-white/15 text-gray-600 dark:text-white/60 hover:border-accent/50 hover:text-accent dark:hover:text-accent bg-white dark:bg-secondary/30'
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" strokeWidth={2} />}
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results counter */}
          <div className="mb-6 text-sm text-gray-600 dark:text-white/60">
            Showing {filteredBrands.length} of {franchiseData.franchises.length} franchises
          </div>

          {/* Brand cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand, idx) => {
                  const meta = categoryMeta[brand.category];
                  const Icon = meta.icon;
                  return (
                    <motion.div
                      key={brand.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96 }}
                      transition={{ duration: 0.32, delay: idx * 0.06 }}
                      className="group relative flex flex-col rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/40 hover:border-accent/40 transition-colors duration-300 premium-card premium-card--soft"
                    >
                      {/* Card header — gradient + logo/avatar */}
                      <div className={`relative flex items-center justify-center h-36 bg-gradient-to-b ${meta.gradientLight} ${meta.gradientDark} border-b border-gray-200 dark:border-white/5`}>
                        <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.6)_0%,transparent_70%)]" />

                        {/* Logo or Avatar */}
                        {brand.logo ? (
                          <FranchiseAvatar
                            name={brand.name}
                            shortName={brand.shortName}
                            category={brand.category}
                            logo={brand.logo}
                            className="w-16 h-16 rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <FranchiseAvatar
                              name={brand.name}
                              shortName={brand.shortName}
                              category={brand.category}
                              className="w-16 h-16 rounded-lg text-sm font-bold"
                            />
                          </div>
                        )}

                        {/* Category badge */}
                        <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.28em] text-accent/70 dark:text-accent/70 font-semibold">
                          {brand.category.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 p-6">
                        <h4 className="text-xl font-playfair text-gray-900 dark:text-white mb-2 leading-snug">
                          {brand.name}
                        </h4>
                        <p className="text-xs text-accent mb-3 font-medium">{brand.shortName}</p>
                        <p className="text-gray-600 dark:text-white/60 text-sm font-light leading-relaxed flex-1">
                          {brand.description}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleRequestInfo(brand.name)}
                          className="mt-6 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-widest uppercase text-accent hover:gap-3 transition-all duration-200"
                        >
                          {t('franchise.requestInfo')}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-12 text-center text-gray-600 dark:text-white/60"
                >
                  <p className="text-lg">No franchises match your search.</p>
                  <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
                </motion.div>
              )}
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

          {/* Certifications & Trust Badges */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <div className="text-center mb-10">
              <h4 className="text-lg font-playfair text-white mb-2">Industry Recognition & Certification</h4>
              <p className="text-white/60 text-sm">Trusted by leading franchise professional organizations</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
              {/* IFPG Member Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-56 h-56 bg-white rounded-2xl p-4 flex items-center justify-center border border-white/20 hover:shadow-lg transition-all">
                  <img
                    src="/logos/ifpg-member.png"
                    alt="IFPG Member Badge"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-xs text-white/60 text-center max-w-40">Proud Member of IFPG</p>
              </div>

              {/* IFPG Logo */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-56 h-56 bg-white rounded-2xl p-4 flex items-center justify-center border border-white/20 hover:shadow-lg transition-all">
                  <img
                    src="/logos/ifpg-logo.png"
                    alt="IFPG Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <p className="text-xs text-white/60 text-center max-w-40">International Franchise Professionals Group</p>
              </div>
            </div>

            <p className="text-center text-xs text-white/50 mt-8">
              New Life Investments is a proud member and certified professional of the International Franchise Professionals Group
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
