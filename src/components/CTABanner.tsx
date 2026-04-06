'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function CTABanner() {
  const t = useTranslations('CTABanner');

  const handleScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden border-t border-b border-white/5">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-white mb-6 leading-tight">
            {t('title')}
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 font-light mb-10 tracking-wide max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MagneticButton onClick={handleScroll} className="px-8 py-4">
              <span className="font-playfair text-lg text-white group-hover:text-accent transition-colors">
                {t('cta')}
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
