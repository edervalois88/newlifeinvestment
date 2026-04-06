'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ShoppingCart, TrendingUp, LogOut } from 'lucide-react';
import Image from 'next/image';

const services = [
  { key: 'buy', icon: ShoppingCart },
  { key: 'invest', icon: TrendingUp },
  { key: 'sell', icon: LogOut }
];

export default function RealEstate() {
  const t = useTranslations('RealEstate');

  return (
    <section id="realEstate" className="py-32 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair mb-6">
              <span className="text-white">{t('title').split(' ')[0]}</span>
              <br />
              <span className="text-accent italic">{t('title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light mb-4 tracking-widest uppercase">
              {t('subtitle')}
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-12 max-w-xl font-light">
              {t('desc')}
            </p>

            <div className="space-y-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.key}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                        <Icon className="w-6 h-6 text-accent group-hover:text-primary" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-playfair text-white mb-2">
                        {t(`${service.key}.title`)}
                      </h4>
                      <p className="text-white/70 font-light text-sm leading-relaxed">
                        {t(`${service.key}.desc`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden border border-accent/20 shadow-2xl group">
              <Image
                src="/houston.png"
                alt="Premium Houston Real Estate"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -right-8 glass-elegant border border-accent/30 p-8 rounded-2xl shadow-2xl z-20 backdrop-blur-xl"
            >
              <div className="text-accent font-playfair text-2xl mb-1 italic">HOUSTON</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">Real Estate Hub</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
