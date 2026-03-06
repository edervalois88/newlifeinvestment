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
      <div className="relative flex flex-col items-center">
        {/* Glow halo behind the logo trace */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-32 h-32 bg-primary/20 rounded-full blur-[40px] z-0"
        />

        {/* Animated Custom SVG Logo Path */}
        <div className="relative z-10 w-[180px] h-[220px]">
          <svg
            viewBox="0 0 200 240"
            width="100%"
            height="100%"
            className="absolute inset-0"
          >
            {/* LEFT BIG SWOOPING ARC — the thick leftmost calligraphic stroke */}
            <motion.path
              d="
                M 62 20
                C 58 10, 50 8, 44 14
                C 36 22, 32 36, 28 54
                C 22 78, 14 104, 18 128
                C 22 148, 34 162, 50 168
                C 62 172, 76 170, 84 162
                C 90 156, 90 148, 84 142
                C 80 136, 72 134, 66 138
                C 58 144, 56 154, 60 162
                C 62 168, 64 168, 62 164
                C 56 154, 56 142, 62 136
                C 68 130, 76 132, 80 140
                C 84 148, 82 158, 76 164
                C 68 172, 54 174, 42 168
                C 28 160, 18 144, 16 124
                C 12 98, 20 68, 28 44
                C 34 24, 44 8, 54 10
                C 60 12, 66 18, 62 20 Z
              "
              fill="#b8962e"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: loading ? 1 : 0, pathLength: loading ? 1 : 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />

            {/* CENTER TALL CURVED STROKE */}
            <motion.path
              d="
                M 90 30
                C 88 20, 82 16, 78 20
                C 72 26, 72 40, 74 56
                C 76 72, 80 88, 82 108
                C 84 126, 84 146, 80 160
                C 78 170, 76 172, 78 168
                C 82 160, 84 142, 84 122
                C 84 100, 82 78, 80 58
                C 78 38, 76 22, 82 16
                C 86 12, 92 16, 94 26
                C 96 36, 94 50, 92 30
                Z
              "
              fill="#b8962e"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: loading ? 1 : 0, pathLength: loading ? 1 : 0 }}
              transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
            />

            {/* RIGHT SLIMMER CALLIGRAPHIC STROKE */}
            <motion.path
              d="
                M 118 44
                C 116 34, 110 28, 106 34
                C 102 40, 104 56, 106 72
                C 108 88, 110 102, 110 116
                C 110 128, 108 136, 106 130
                C 104 122, 104 106, 104 90
                C 104 72, 104 54, 106 40
                C 108 28, 114 24, 118 30
                C 122 36, 122 50, 120 44
                Z
              "
              fill="#b8962e"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: loading ? 1 : 0, pathLength: loading ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            />

            {/* BOTTOM BASE HORIZONTAL CONNECTOR (the horizontal sweep near bottom) */}
            <motion.path
              d="
                M 18 164
                C 28 172, 46 176, 62 174
                C 78 172, 90 164, 88 160
                C 86 156, 78 158, 66 160
                C 52 162, 34 162, 20 156
                C 16 154, 14 156, 18 164 Z
              "
              fill="#b8962e"
              initial={{ opacity: 0 }}
              animate={{ opacity: loading ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
            />

            {/* DIAMOND at bottom */}
            <motion.path
              d="M 66 192 L 74 182 L 82 192 L 74 202 Z"
              fill="#b8962e"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: loading ? 1 : 0, scale: loading ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 1.4, ease: "backOut" }}
              style={{ transformOrigin: '74px 192px' }}
            />
          </svg>
        </div>

        {/* Brand Text Fading In instead of the JPG */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loading ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="relative z-20 mt-6 text-center"
        >
          <span className="font-playfair text-xl md:text-2xl text-primary tracking-widest uppercase drop-shadow-[0_0_10px_rgba(247,231,206,0.3)]">
            New Life
          </span>
          <br />
          <span className="text-secondary tracking-[0.3em] uppercase text-xs font-light">
            Investments USA
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
