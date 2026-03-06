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
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-base-300">
      {/* Parallax Background */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/hero.jpg"
          alt="Architectural Mexican Global Bridge"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base-300/40 via-base-300/80 to-base-300 z-10" />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair text-primary mb-6 leading-tight max-w-4xl mx-auto drop-shadow-lg p-2">
            {t('title')}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <p className="text-base sm:text-lg md:text-2xl text-neutral mb-12 max-w-2xl mx-auto font-light tracking-wide px-4">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <MagneticButton className="px-8 py-4">
            <span className="font-playfair text-lg text-primary">{t('cta')}</span>
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-300 to-transparent z-20" />
    </section>
  );
}
