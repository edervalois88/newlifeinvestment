'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-8">
              <span className="text-white">{t('aboutTitle').split(',')[0]}</span>
              <br />
              <span className="text-accent italic">{t('aboutTitle').split(',')[1]}</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              {t('aboutDesc')}
            </p>
            <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8 border-t border-white/5 pt-10">
              <div>
                <span className="block text-2xl md:text-3xl font-playfair text-accent italic mb-2">15+</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium whitespace-nowrap">Años de Exp.</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-playfair text-accent italic mb-2">3</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium whitespace-nowrap">Sedes Globales</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-2xl md:text-3xl font-playfair text-accent italic mb-2">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium whitespace-nowrap">Integridad</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden border border-accent/20 shadow-2xl">
              <Image
                src="/hero.jpg"
                alt="Architecture and Excellence"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </div>
            
            {/* Elegant Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-8 glass-elegant border border-accent/30 p-8 rounded-2xl shadow-2xl z-20 backdrop-blur-xl"
            >
              <div className="text-accent font-playfair text-2xl mb-1 italic">NLI</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">Division Mexico</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -z-0" />
    </section>
  );
}
