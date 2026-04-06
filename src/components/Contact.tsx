'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { sendLeadEmail } from '@/app/actions';
import MagneticButton from './MagneticButton';
import { Toaster, toast } from 'react-hot-toast';

export default function Contact() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const onFranchiseRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ subject?: string }>;
      if (customEvent.detail?.subject) {
        setSubject(customEvent.detail.subject);
      }
    };

    window.addEventListener('franchise-request-info', onFranchiseRequest);
    return () => {
      window.removeEventListener('franchise-request-info', onFranchiseRequest);
    };
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const result = await sendLeadEmail(formData);
    if (result.success) {
      toast.success(t('successToast'), {
        style: {
          background: '#1a1a1a',
          color: '#f7e7ce',
          border: '1px solid rgba(247, 231, 206, 0.2)'
        },
        iconTheme: {
          primary: '#f7e7ce',
          secondary: '#1a1a1a',
        },
      });
      formRef.current?.reset();
      setSubject('');
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-primary relative">
      <Toaster position="bottom-right" />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-accent mb-4 drop-shadow-md">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-accent/30 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-elegant premium-card premium-card--soft p-6 sm:p-8 md:p-12 rounded-3xl"
        >
          <form ref={formRef} action={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-white/70 font-medium">{t('name')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="input input-bordered w-full bg-secondary/50 border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white rounded-xl" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm text-white/70 font-medium">{t('email')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="input input-bordered w-full bg-secondary/50 border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white rounded-xl" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm text-white/70 font-medium">{t('subject')}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
                className="input input-bordered w-full bg-secondary/50 border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-white/70 font-medium">{t('message')}</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                required 
                className="textarea textarea-bordered w-full bg-secondary/50 border-white/10 focus:border-accent/50 focus:ring-1 focus:ring-accent/50 text-white rounded-xl resize-none"
              ></textarea>
            </div>

            <div className="mt-6 flex justify-center">
              <MagneticButton type="submit">
                <span className="w-full h-full font-playfair text-lg text-white group-hover:text-accent tracking-wide cursor-pointer flex items-center justify-center">
                  {t('send')}
                </span>
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
