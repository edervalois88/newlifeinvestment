'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import React, { useState } from 'react';

const cities = [
  { id: 'mx', name: 'Mexico City', x: 200, y: 300 },
  { id: 'hou', name: 'Houston', x: 260, y: 220 },
  { id: 'riyadh', name: 'Riyadh', x: 740, y: 240 }
];

export default function Gateway() {
  const t = useTranslations('Gateway');
  const [active, setActive] = useState(false);

  // SVG dimensions: 1000x500
  const dPath = active 
    ? `M 200 300 Q 230 260, 260 220 C 400 150, 600 150, 740 240` // connect mx to houston, then arch to riyadh
    : `M 200 300 Q 230 280, 260 220 C 400 220, 600 240, 740 240`; // flatter curve before hover

  return (
    <section id="gateway" className="py-24 bg-base-200 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row items-center gap-16 object-cover">
        
        <motion.div 
          className="lg:w-1/3 z-10"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral font-light leading-relaxed">
            {t('desc')}
          </p>
        </motion.div>

        <motion.div 
          className="lg:w-2/3 w-full relative z-10 glass-elegant rounded-3xl p-8"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <div className="relative w-full aspect-[2/1] overflow-visible">
            <svg 
              viewBox="0 0 1000 500" 
              className="absolute inset-0 w-full h-full drop-shadow-2xl" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f7e7ce" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#f7e7ce" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f7e7ce" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base Map Abstract Shapes */}
              <circle cx="200" cy="300" r="100" fill="url(#lineGradient)" opacity="0.05" />
              <circle cx="740" cy="240" r="120" fill="url(#lineGradient)" opacity="0.05" />

              {/* Animated Path */}
              <motion.path
                d={dPath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="10, 10"
                strokeLinecap="round"
                animate={{
                  strokeDashoffset: active ? [0, -40] : 0,
                  d: dPath
                }}
                transition={{
                  strokeDashoffset: { repeat: Infinity, duration: 1, ease: 'linear' },
                  d: { duration: 0.8, ease: "easeInOut" }
                }}
                filter="url(#glow)"
              />

              {/* City Dots & Labels */}
              {cities.map((city, idx) => (
                <g key={city.id}>
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r="6"
                    fill="#f7e7ce"
                    filter="url(#glow)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.2, type: 'spring' }}
                  />
                  <motion.text
                    x={city.x}
                    y={city.y - 15}
                    fill="#ededed"
                    fontSize="16"
                    fontFamily="Inter, sans-serif"
                    textAnchor="middle"
                    className="font-light tracking-widest drop-shadow-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.2 }}
                  >
                    {city.name.toUpperCase()}
                  </motion.text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
