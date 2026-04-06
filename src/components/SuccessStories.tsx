'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import React from 'react';
import Image from 'next/image';

export default function SuccessStories() {
  const t = useTranslations('SuccessStories');

  const stories = [
    {
      id: 'storyA',
      title: t('storyAtitle'),
      desc: t('storyAdesc'),
      image: '/houston.jpg',
    },
    {
      id: 'storyB',
      title: t('storyBtitle'),
      desc: t('storyBdesc'),
      image: '/riyadh.jpg',
    }
  ];

  return (
    <section id="stories" className="py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4 drop-shadow-md">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-12">
          {stories.map((story, index) => (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              key={story.id}
              className="premium-card premium-card--strong w-full h-[420px] sm:h-[480px] relative rounded-3xl overflow-hidden glass-elegant group transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(197,160,89,0.3)]"
            >
              {/* Background Image — grayscale by default, full color on hover */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:saturate-125 group-hover:contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/20 z-10" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <div className="overflow-hidden mb-4">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-playfair text-accent leading-tight"
                  >
                    {story.title}
                  </motion.h3>
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-12 h-px bg-accent/50 mb-6"
                />
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-white font-light text-lg tracking-wide leading-relaxed max-w-xl"
                >
                  {story.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
