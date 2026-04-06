'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function StatCounter({
  value,
  suffix,
  label,
  duration = 1400
}: {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, started, value]);

  return (
    <motion.div
      ref={rootRef}
      whileHover={{ y: -3, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="premium-card premium-card--soft rounded-xl p-2 sm:p-3 border border-white/10"
    >
      <span className="block text-2xl md:text-3xl font-playfair text-accent italic mb-2">
        {display}
        {suffix ?? ''}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

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
              <span className="text-white">{t('aboutTitleLine1')}</span>
              <br />
              <span className="text-accent italic">{t('aboutTitleLine2')}</span>
            </h2>
            <div className="space-y-6 mb-10 text-white/70 text-base md:text-lg leading-relaxed max-w-xl font-light">
              <p>{t('aboutDesc1')}</p>
              <p>{t('aboutDesc2')}</p>
              <p>{t('aboutDesc3')}</p>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8 border-t border-white/5 pt-10">
              <StatCounter value={15} suffix="+" label={t('statsYears')} />
              <StatCounter value={3} label={t('statsOffices')} duration={1200} />
              <div className="col-span-2 sm:col-span-1">
                <StatCounter value={100} suffix="%" label={t('statsIntegrity')} duration={1600} />
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
            <div className="premium-card premium-card--strong aspect-[4/5] relative rounded-3xl overflow-hidden border border-accent/20 shadow-2xl">
              <Image
                src="/houston.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover contrast-125 saturate-110 hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/35 to-transparent" />
            </div>
            
            {/* Elegant Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-8 glass-elegant premium-card premium-card--soft border border-accent/30 p-8 rounded-2xl shadow-2xl z-20 backdrop-blur-xl"
            >
              <div className="text-accent font-playfair text-2xl mb-1 italic">{t('badgeTitle')}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">{t('badgeSubtitle')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full translate-x-1/2 -z-0" />
    </section>
  );
}
