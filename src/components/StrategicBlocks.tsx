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

const ITEMS_PER_PAGE = 9;

export default function StrategicBlocks() {
  const t = useTranslations('StrategicBlocks');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
    if (selectedCategory !== 'all') result = result.filter((item) => item.category === selectedCategory);
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

  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const paginatedBrands = filteredBrands.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (key: string) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

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
                onChange={(e) => handleSearchChange(e.target.value)}
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
                    onClick={() => handleCategoryChange(category.key)}
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase border transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-accent border-accent shadow-[0_0_20px_rgba(197,160,89,0.35)] font-bold'
                        : 'border-white/15 text-white/55 bg-secondary/30 hover:border-accent/50 hover:text-accent'
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
          <div className="mb-5 text-sm text-white/50">
            Showing {filteredBrands.length} of {franchiseData.franchises.length} franchises
          </div>

          {/* Brand cards grid — minimal design */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {paginatedBrands.length > 0 ? (
                paginatedBrands.map((brand, idx) => {
                  const meta = categoryMeta[brand.category];
                  const Icon = meta.icon;
                  return (
                    <motion.div
                      key={brand.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-secondary/40 hover:border-accent/50 transition-colors duration-200"
                    >
                      {/* Avatar */}
                      <FranchiseAvatar
                        name={brand.name}
                        shortName={brand.shortName}
                        category={brand.category}
                        logo={brand.logo ?? undefined}
                        className="w-12 h-12 rounded-xl shrink-0 text-sm font-bold"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.22em] text-accent/70 font-semibold mb-0.5">
                          {brand.category.replace('-', ' ')}
                        </p>
                        <h4 className="text-sm font-medium text-white leading-snug truncate">
                          {brand.name}
                        </h4>
                        <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed font-light">
                          {brand.description}
                        </p>
                      </div>

                      {/* CTA */}
                      <button
                        type="button"
                        onClick={() => handleRequestInfo(brand.name)}
                        className="shrink-0 text-accent/60 group-hover:text-accent transition-colors"
                        aria-label="Request info"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-12 text-center text-white/50"
                >
                  <p className="text-lg">No franchises match your search.</p>
                  <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-xl border border-white/10 bg-secondary/30 text-white/60 hover:border-accent/50 hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl border text-xs font-medium transition-all ${
                    page === currentPage
                      ? 'bg-primary border-accent text-accent font-bold'
                      : 'border-white/10 bg-secondary/30 text-white/60 hover:border-accent/50 hover:text-accent'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-xl border border-white/10 bg-secondary/30 text-white/60 hover:border-accent/50 hover:text-accent disabled:opacity-25 disabled:cursor-not-allowed transition-all text-sm"
              >
                →
              </button>
            </div>
          )}

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
                    src="/IFPG_Member_Badge_new.png"
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
                    src="/IFPG_logo.png"
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
