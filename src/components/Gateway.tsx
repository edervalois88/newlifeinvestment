'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import React, { useState } from 'react';

const countries = [
  { id: 'mx', key: 'countryMexico', x: 220, y: 275, glow: 120 },
  { id: 'us', key: 'countryUSA', x: 430, y: 215, glow: 120 },
  { id: 'sa', key: 'countrySaudiArabia', x: 760, y: 240, glow: 120 }
];

const countryShapes = [
  {
    id: 'mx-shape',
    d: 'M142 278 L150 254 L168 240 L186 234 L203 238 L214 248 L228 249 L244 258 L257 273 L252 288 L238 295 L227 304 L214 309 L203 319 L190 323 L180 313 L172 301 L160 293 L149 289 Z'
  },
  {
    id: 'us-shape',
    d: 'M352 198 L362 183 L385 172 L411 166 L439 168 L466 173 L489 179 L507 189 L518 201 L514 214 L500 223 L475 228 L450 232 L422 233 L397 230 L374 224 L360 214 Z'
  },
  {
    id: 'sa-shape',
    d: 'M700 236 L708 217 L724 203 L744 194 L768 192 L792 197 L812 207 L826 221 L832 238 L828 253 L816 267 L796 275 L771 279 L747 278 L726 269 L710 255 Z'
  }
];

export default function Gateway() {
  const t = useTranslations('Gateway');
  const [active, setActive] = useState(false);

  const dPath = active
    ? `M 220 275 C 285 205, 370 185, 430 215 S 640 255, 760 240`
    : `M 220 275 C 295 240, 365 225, 430 215 S 640 230, 760 240`;

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
                  <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#C5A059" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {countries.map((country) => (
                <circle
                  key={`${country.id}-glow`}
                  cx={country.x}
                  cy={country.y}
                  r={country.glow}
                  fill="url(#lineGradient)"
                  opacity="0.05"
                />
              ))}

              {countryShapes.map((shape) => (
                <motion.path
                  key={shape.id}
                  d={shape.d}
                  fill="url(#lineGradient)"
                  stroke="#C5A059"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                  opacity={active ? 0.42 : 0.3}
                  animate={{ opacity: active ? 0.46 : 0.3 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
              ))}

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

              {countries.map((country, idx) => (
                <g key={country.id}>
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
                    x={country.x}
                    y={country.y - 18}
                    fill="#ededed"
                    fontSize="16"
                    fontFamily="Inter, sans-serif"
                    textAnchor="middle"
                    className="font-light tracking-widest drop-shadow-md"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.2 }}
                  >
                    {t(country.key).toUpperCase()}
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
