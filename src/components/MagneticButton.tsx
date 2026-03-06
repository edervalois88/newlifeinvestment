'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef } from 'react';

export default function MagneticButton({
  children,
  className = '',
  type = 'button',
  onClick
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] ${className}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c5c6c7_0%,#f7e7ce_50%,#c5c6c7_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-base-300 px-8 py-4 text-sm font-medium text-neutral backdrop-blur-3xl transition-colors hover:text-primary hover:bg-opacity-90">
        {children}
      </span>
    </motion.button>
  );
}
