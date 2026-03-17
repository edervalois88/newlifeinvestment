'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Store, Plane, Home, GraduationCap } from 'lucide-react';
import React, { useState } from 'react';

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

  const services = [
    { key: 'immigration', icon: 'immigration' },
    { key: 'realEstate', icon: 'realEstate' },
    { key: 'academic', icon: 'academic' },
    { key: 'franchise', icon: 'franchise' },
    { key: 'brand', icon: 'brand' }
  ];

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
                className="relative group block p-8 rounded-2xl glass-elegant transition-all duration-500 hover:border-secondary hover:shadow-[0_0_40px_rgba(0,18,36,0.5)] border-white/5 cursor-pointer h-full"
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
                  <div className="w-14 h-14 rounded-full bg-secondary/80 border border-white/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                    <Icon strokeWidth={1.5} className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-playfair text-white mb-4">
                    {t(`${service.key}.title`)}
                  </h3>
                  
                  <p className="text-white/60 font-light leading-relaxed">
                    {t(`${service.key}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
