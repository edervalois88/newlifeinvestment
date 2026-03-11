'use client';

import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2-3 second minimum loader or until window is completely loaded
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: loading ? 0 : '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-base-300 flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center px-6">
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-12 scale-75 sm:scale-90 md:scale-100 mb-12">
          
          {/* Símbolo a la izquierda (o arriba en mobile) */}
          <div className="relative w-[100px] md:w-[120px] h-[140px] md:h-[160px]">
            <svg
              viewBox="0 0 100 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.path
                d="M35 110 C20 105 15 90 25 75 C35 60 45 50 35 30 C25 10 35 5 40 5 C45 5 48 15 42 30 C35 50 25 65 30 80 C35 95 50 100 35 110 Z"
                stroke="#C5A059"
                strokeWidth="0.8"
                fill="#C5A059"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: loading ? 1 : 0, fillOpacity: loading ? 1 : 0 }}
                transition={{ pathLength: { duration: 2 }, fillOpacity: { duration: 1, delay: 1.2 } }}
              />
              <motion.path
                d="M50 95 C45 80 45 60 55 40 C65 20 60 10 55 10 C50 10 48 20 52 40 C56 60 56 80 50 95 Z"
                stroke="#C5A059"
                strokeWidth="0.8"
                fill="#C5A059"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: loading ? 1 : 0, fillOpacity: loading ? 1 : 0 }}
                transition={{ pathLength: { duration: 1.8, delay: 0.3 }, fillOpacity: { duration: 1, delay: 1.5 } }}
              />
              <motion.path
                d="M65 80 C60 70 65 55 70 40 C75 25 72 20 68 20 C64 20 62 30 65 45 C68 60 68 70 65 80 Z"
                stroke="#C5A059"
                strokeWidth="0.8"
                fill="#C5A059"
                initial={{ pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: loading ? 1 : 0, fillOpacity: loading ? 1 : 0 }}
                transition={{ pathLength: { duration: 1.5, delay: 0.6 }, fillOpacity: { duration: 1, delay: 1.8 } }}
              />
              <motion.path
                d="M28 120 L33 115 L38 120 L33 125 Z"
                fill="#C5A059"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: loading ? 1 : 0, opacity: loading ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 2, ease: "backOut" }}
                style={{ transformOrigin: "33px 120px" }}
              />
            </svg>
          </div>

          {/* Textos a la derecha (o abajo en mobile) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: loading ? 1 : 0, x: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-white font-playfair text-4xl sm:text-5xl md:text-6xl tracking-tight mb-2 flex items-baseline gap-1"
            >
              New Life
            </motion.h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: loading ? 1 : 0 }}
              transition={{ duration: 1.5, delay: 1.8 }}
              className="w-full h-[1px] bg-accent/40 origin-left mb-3"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 0.7 : 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="flex items-center gap-2 md:gap-3 text-accent tracking-[0.2em] md:tracking-[0.4em] uppercase text-[9px] sm:text-[10px] md:text-xs font-medium"
            >
              <span>INVESTMENTS</span>
              <span className="w-1 h-1 bg-accent rounded-full hidden sm:block" />
              <span>AE</span>
            </motion.div>
          </div>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-32 md:w-48 h-[1px] bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: loading ? "100%" : "0%" }}
            transition={{ 
              duration: 3, 
              repeat: loading ? Infinity : 0, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-accent/40"
          />
        </div>
      </div>
    </motion.div>
  );
}
