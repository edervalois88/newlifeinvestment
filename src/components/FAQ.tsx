'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: t('q1'),
      a: t('a1'),
    },
    {
      q: t('q2'),
      a: t('a2'),
    },
    {
      q: t('q3'),
      a: t('a3'),
    },
    {
      q: t('q4'),
      a: t('a4'),
    },
    {
      q: t('q5'),
      a: t('a5'),
    }
  ];

  return (
    <section id="faq" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4 drop-shadow-md">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="glass-elegant rounded-2xl overflow-hidden hover:bg-white/5 transition-colors border border-white/5"
            >
              <button
                className="w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-playfair text-xl text-white">{faq.q}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                   <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-6 text-white/70 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
