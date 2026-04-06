'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Home, 
  GraduationCap, 
  Car, 
  Sparkles 
} from 'lucide-react';

const steps = [
  { key: 'Step1', icon: CreditCard },
  { key: 'Step2', icon: Home },
  { key: 'Step3', icon: GraduationCap },
  { key: 'Step4', icon: Car },
  { key: 'Step5', icon: Sparkles },
];

export default function Process() {
  const t = useTranslations('Process');

  return (
    <section id="process" className="py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-24"
        >
          <span className="text-accent tracking-[0.4em] uppercase text-xs font-bold mb-4 block italic">{t('eyebrow')}</span>
          <h2 className="text-4xl md:text-5xl font-playfair text-white">{t('processTitle')}</h2>
        </motion.div>

        <div className="relative">
          {/* Central Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2 hidden xl:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 xl:gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group"
                >
                    <div className="premium-card premium-card--strong bg-primary/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/5 transition-all duration-500 shadow-xl relative z-10 text-center">
                      <div className="icon-shell w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110">
                        <Icon className="icon-glyph w-8 h-8" />
                    </div>
                    <span className="block text-accent/50 text-xs font-bold tracking-widest uppercase mb-4">{t('stepLabel')} 0{index + 1}</span>
                      <h3 className="text-base sm:text-lg font-playfair mb-4 leading-snug text-white/90 sm:text-white">
                      {t(`process${step.key}`)}
                    </h3>
                    <div className="w-8 h-1 bg-accent/20 mx-auto rounded-full group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
