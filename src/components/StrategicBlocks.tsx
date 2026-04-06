'use client';

import React, { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { BriefcaseBusiness, Building2, CircleDollarSign, GraduationCap, Home, Plane, Scale, Sparkles, TrendingUp } from 'lucide-react';

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

        <motion.div
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-elegant rounded-3xl p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <h3 className="text-2xl font-playfair text-white">{t('franchise.title')}</h3>
            <div className="flex flex-wrap gap-2">
              {categoryKeys.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs tracking-wide border transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent/20 border-accent text-accent'
                      : 'bg-secondary/40 border-white/15 text-white/70 hover:border-accent/50 hover:text-white'
                  }`}
                >
                  {t(`franchise.categories.${category}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-8">
            {franchiseSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-secondary/40 p-4">
                <span className="text-[10px] text-accent/80 tracking-widest">0{index + 1}</span>
                <div className="text-white text-sm mt-1">{t(`franchise.process.${step}`)}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <div key={brand.key} className="rounded-2xl border border-white/10 bg-secondary/50 p-5 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <CircleDollarSign className="w-4 h-4" strokeWidth={1.7} />
                  <span className="text-xs tracking-widest uppercase">{t(`franchise.categories.${brand.category}`)}</span>
                </div>
                <h4 className="text-white font-playfair text-xl mb-2">{t(`franchise.featured.${brand.key}.name`)}</h4>
                <p className="text-white/65 text-sm font-light leading-relaxed">{t(`franchise.featured.${brand.key}.desc`)}</p>
                <button
                  type="button"
                  onClick={() => handleRequestInfo(t(`franchise.featured.${brand.key}.name`))}
                  className="mt-4 px-4 py-2 rounded-full border border-accent/50 text-accent text-xs tracking-widest uppercase hover:bg-accent/15 transition-colors"
                >
                  {t('franchise.requestInfo')}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
