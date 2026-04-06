'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { Plane, FileText, Briefcase, Users, Globe, BookOpen } from 'lucide-react';

const visaIcons = {
  eb5: FileText,
  greenCard: Users,
  e2: Briefcase,
  l1: Globe,
  tn: BookOpen,
  student: Plane
};

export default function Immigration() {
  const t = useTranslations('Immigration');

  const visas = [
    { key: 'eb5', icon: 'eb5' },
    { key: 'greenCard', icon: 'greenCard' },
    { key: 'e2', icon: 'e2' },
    { key: 'l1', icon: 'l1' },
    { key: 'tn', icon: 'tn' },
    { key: 'student', icon: 'student' }
  ];

  return (
    <section id="immigration" className="py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-accent text-lg mb-4 font-light tracking-wide">
            {t('subtitle')}
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            {t('desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visas.map((visa, index) => {
            const Icon = visaIcons[visa.icon as keyof typeof visaIcons];
            return (
              <motion.div
                key={visa.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 p-8 rounded-2xl transition-all duration-500 h-full flex flex-col items-center text-center hover:bg-white/10">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-secondary transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent group-hover:text-secondary" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-playfair text-white mb-3">
                    {t(`${visa.key}.title`)}
                  </h3>
                  
                  <p className="text-white/70 font-light text-sm leading-relaxed">
                    {t(`${visa.key}.desc`)}
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
