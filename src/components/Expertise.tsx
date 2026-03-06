'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

export default function Expertise() {
  const t = useTranslations('Expertise');

  const competencies = [
    {
      id: 'integrity',
      title: t('integrityTitle'),
      desc: t('integrityDesc'),
      icon: ShieldCheck,
    },
    {
      id: 'experience',
      title: t('experienceTitle'),
      desc: t('experienceDesc'),
      icon: TrendingUp,
    },
    {
      id: 'team',
      title: t('teamTitle'),
      desc: t('teamDesc'),
      icon: Users,
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-base-300 relative border-b border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            className="lg:w-1/3 text-center lg:text-start"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-secondary tracking-widest uppercase text-sm font-medium mb-4">{t('subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-playfair text-primary mb-6 drop-shadow-md">
              {t('title')}
            </h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto lg:mx-0 rounded-full" />
          </motion.div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {competencies.map((comp, idx) => (
              <motion.div 
                key={comp.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 * idx }}
                className="glass-elegant p-8 rounded-3xl flex flex-col items-center text-center group cursor-default hover:bg-white/5 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <comp.icon className="w-8 h-8 text-primary shadow-primary drop-shadow-[0_0_15px_rgba(247,231,206,0.5)]" strokeWidth={1.5} />
                </div>
                <h4 className="font-playfair text-2xl text-white mb-3">{comp.title}</h4>
                <p className="text-neutral font-light text-sm leading-relaxed">{comp.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
