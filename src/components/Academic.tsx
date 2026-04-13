'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { BookOpen, Lock, Home } from 'lucide-react';

const academicServices = [
  { key: 'selection', icon: BookOpen },
  { key: 'visa', icon: Lock },
  { key: 'support', icon: Home }
];

export default function Academic() {
  const t = useTranslations('Academic');

  return (
    <section id="academic" className="py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-accent text-lg mb-4 font-light tracking-wide">
            {t('subtitle')}
          </p>
          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {academicServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group flex flex-col items-center text-center h-full"
              >
                <div className="glass-elegant border border-white/10 hover:border-accent/40 p-10 rounded-3xl w-full transition-all duration-500 hover:bg-white/5 flex flex-col items-center h-full">
                  <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-secondary transition-all duration-300">
                    <Icon className="w-10 h-10 text-accent group-hover:text-secondary" strokeWidth={1.5} />
                  </div>

                  <div className="inline-block mb-4 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent">
                      {t(`${service.key}.label`)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-playfair text-white mb-4">
                    {t(`${service.key}.title`)}
                  </h3>

                  <p className="text-white/70 font-light text-sm leading-relaxed flex-grow flex items-center">
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
