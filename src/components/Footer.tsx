'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { LinkedinIcon, InstagramIcon, FacebookIcon, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const common = useTranslations('Common');
  const currentYear = new Date().getFullYear();

  const services = [
    { labelKey: 'linkImmigration', href: '/#immigration' },
    { labelKey: 'linkRealEstate', href: '/#realEstate' },
    { labelKey: 'linkAcademic', href: '/#academic' },
    { labelKey: 'linkFranchises', href: '/franchises' },
    { labelKey: 'linkExpertise', href: '/#expertise' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: 'https://www.linkedin.com/company/newlifeinvestments',
      delay: 0.1,
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://www.instagram.com/newlifeinvestments',
      delay: 0.2,
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: 'https://www.facebook.com/newlifeinvestments',
      delay: 0.3,
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:hello@newlifeinvestments.com',
      delay: 0.4,
    },
  ];

  return (
    <footer className="py-12 md:py-16 bg-primary border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1"
            >
              <h3 className="text-2xl font-playfair text-accent mb-3">New Life Investments</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {t('tagline')}
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-1"
            >
              <h4 className="text-white font-semibold mb-4 tracking-wide text-sm">{t('servicesTitle')}</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.labelKey}>
                    <Link href={service.href as '/franchises'} className="text-white/50 hover:text-accent text-sm transition-colors">
                      {t(service.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-1"
            >
              <h4 className="text-white font-semibold mb-4 tracking-wide text-sm">{t('companyTitle')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/#contact" className="text-white/50 hover:text-accent text-sm transition-colors">
                    {t('linkContact')}
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 py-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/40 text-sm tracking-wide"
            >
              {common('footerRights', { year: currentYear })}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, color: '#C5A059' }}
                    transition={{ duration: 0.3, delay: social.delay }}
                    className="p-2 rounded-lg border border-white/5 text-white/50 hover:text-accent hover:border-accent/30 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
