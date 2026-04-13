'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import MagneticButton from './MagneticButton';

import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('Hero');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-16 sm:pt-20">
      {/* Parallax Background Layer - Subtle */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/hero.jpg"
          alt={t('imageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-overlay"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/55 via-primary/68 to-primary/85 sm:from-primary/40 sm:via-primary/55 sm:to-primary/75" />
      </motion.div>

      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[26rem] h-[26rem] sm:w-[44rem] sm:h-[44rem] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-playfair text-white mb-5 sm:mb-6 leading-[1.05] max-w-4xl mx-auto drop-shadow-2xl p-2 uppercase tracking-tight">
            {t('title')}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <p className="text-sm sm:text-lg md:text-2xl text-white/90 mb-9 sm:mb-12 max-w-2xl mx-auto font-light tracking-normal sm:tracking-wide px-2 sm:px-4 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
 
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <MagneticButton
            className="px-7 sm:px-10 py-3 sm:py-4"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-playfair text-base sm:text-lg text-white tracking-wide">{t('cta')}</span>
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent z-20" />
    </section>
  );
}
