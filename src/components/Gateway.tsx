'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import React, { useState } from 'react';

const cities = [
  { id: 'dubai', key: 'dubai', x: 200, y: 305 },
  { id: 'usa', key: 'usa', x: 500, y: 230 },
  { id: 'abudhabi', key: 'abudhabi', x: 780, y: 205 }
];

export default function Gateway() {
  const t = useTranslations('Gateway');
  const [active, setActive] = useState(false);

  // SVG dimensions: 1000x500
  const dPath = active 
    ? `M 200 305 Q 300 210, 500 230 T 780 205`
    : `M 200 305 Q 310 245, 500 230 T 780 205`;

  return (
    <section id="gateway" className="py-24 bg-secondary border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row items-center gap-16 object-cover">
        
        <motion.div 
          className="lg:w-1/3 z-10"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-6">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed mb-6">
            {t('desc1')}
          </p>
          <p className="text-base md:text-lg text-white/70 font-light leading-relaxed mb-8">
            {t('desc2')}
          </p>
          <div className="space-y-3">
            <div className="text-sm text-accent font-medium tracking-wider">
              {t('opportunities')}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-2/3 w-full relative z-10 glass-elegant premium-card premium-card--soft rounded-3xl p-6 sm:p-8"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <div className="relative w-full aspect-2/1 overflow-visible">
            <svg 
              viewBox="0 0 1000 500" 
              className="absolute inset-0 w-full h-full drop-shadow-2xl" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.22" />
                  <stop offset="45%" stopColor="#C5A059" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E2C588" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <marker id="arrowHead" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 6 L 0 11 z" fill="#D5B06B" />
                </marker>
              </defs>

              {/* Base Map Abstract Shapes */}
              <circle cx="200" cy="300" r="100" fill="url(#lineGradient)" opacity="0.05" />
              <circle cx="500" cy="230" r="95" fill="url(#lineGradient)" opacity="0.04" />
              <circle cx="780" cy="205" r="110" fill="url(#lineGradient)" opacity="0.05" />

              {/* Animated Path */}
              <motion.path
                d={dPath}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2.6"
                strokeDasharray="10, 10"
                strokeLinecap="round"
                markerEnd="url(#arrowHead)"
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

              <motion.circle
                r="4.6"
                fill="#E2C588"
                filter="url(#glow)"
                animate={{
                  offsetDistance: active ? ['0%', '100%'] : ['0%', '100%']
                }}
                transition={{
                  duration: active ? 2.4 : 3.8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  offsetPath: `path('${dPath}')`
                }}
              />

              {/* City Dots & Labels */}
              {cities.map((city, idx) => (
                <g key={city.id}>
                  <motion.circle
                    cx={country.x}
                    cy={country.y}
                    r="6"
                    fill="#C5A059"
                    filter="url(#glow)"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.2, type: 'spring' }}
                  />
                  <motion.text
                    x={city.x}
                    y={city.y - 15}
                    fill="var(--gateway-city-label)"
                    fontSize="16"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    className="tracking-widest"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.2 }}
                  >
                    {t(`cities.${city.key}`).toUpperCase()}
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
