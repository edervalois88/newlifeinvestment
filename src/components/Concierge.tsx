'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { 
  Truck, 
  Key, 
  ShieldCheck, 
  MapPin, 
  PhoneCall 
} from 'lucide-react';
import Image from 'next/image';

export default function Concierge() {
  const t = useTranslations('Concierge');

  const conciergeServices = [
    { icon: Truck, text: t('item1'), delay: 0.1 },
    { icon: Key, text: t('item2'), delay: 0.2 },
    { icon: ShieldCheck, text: t('item3'), delay: 0.3 },
    { icon: MapPin, text: t('item4'), delay: 0.4 },
    { icon: PhoneCall, text: t('item5'), delay: 0.5 },
  ];

  return (
    <section id="concierge" className="py-48 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-30">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <span className="text-accent tracking-widest uppercase text-xs font-bold mb-4 block italic">{t('tagline')}</span>
            <h2 className="text-4xl md:text-6xl font-playfair mb-8 text-white italic">
              {t('conciergeTitle')}
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
              {t('conciergeDesc')}
            </p>

            <ul className="space-y-8">
              {conciergeServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: service.delay }}
                    className="flex items-center gap-6 group hover:translate-x-2 transition-transform cursor-default"
                  >
                    <div className="icon-shell p-3 rounded-xl border group-hover:scale-110">
                      <Icon className="icon-glyph w-6 h-6" />
                    </div>
                    <span className="text-white/80 font-medium tracking-wide group-hover:text-[#8f6a2f] transition-colors text-lg">
                      {service.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Visual Showcase */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="aspect-square relative rounded-full overflow-hidden border border-accent/10 group shadow-[0_0_80px_rgba(197,160,89,0.1)] max-w-md mx-auto"
            >
              <Image 
                src="/riyadh.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover contrast-125 saturate-105 transition-all duration-2000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 mix-blend-overlay group-hover:bg-transparent transition-all duration-1000" />
            </motion.div>

            {/* Premium Gold Ring */}
            <div className="absolute inset-0 -m-8 rounded-full border border-accent/10 border-dashed animate-spin-slow pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Luxury Blur Background Elements */}
      <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] -translate-x-1/2 -z-0" />
      <div className="absolute bottom-1/4 right-0 w-[30vw] h-[30vw] bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 -z-0" />
    </section>
  );
}
