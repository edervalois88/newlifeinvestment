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
      image: '/houston.png',
    },
    {
      id: 'storyB',
      title: t('storyBtitle'),
      desc: t('storyBdesc'),
      image: '/riyadh.png',
    }
  ];

  return (
    <section id="stories" className="py-24 bg-base-300 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-4 drop-shadow-md">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
        </motion.div>
      </div>

      <div className="w-full">
        {/* Horizontal Scroll Snap container */}
        <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 px-6 md:px-24 pb-12 pt-4 hide-scrollbar">
          {stories.map((story, index) => (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              key={story.id} 
              className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[500px] relative rounded-3xl overflow-hidden glass-elegant group transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(247,231,206,0.5)]"
            >
              {/* Background Image with Dark Overlay */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                <div className="overflow-hidden mb-4">
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-playfair text-primary leading-tight"
                  >
                    {story.title}
                  </motion.h3>
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="w-12 h-px bg-primary/50 mb-6"
                />
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-neutral font-light text-lg tracking-wide leading-relaxed max-w-xl"
                >
                  {story.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
