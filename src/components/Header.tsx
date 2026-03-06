'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (locale: 'en' | 'es' | 'ar') => {
    router.replace(pathname, { locale });
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-elegant border-b border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="relative z-20 flex items-center transition-transform hover:scale-105">
          <Image 
            src="/logo.jpg" 
            alt="New Life Investments Logo" 
            width={180} 
            height={50} 
            priority
            className="object-contain h-10 w-auto invert brightness-150 contrast-125 mix-blend-screen" 
          />
        </Link>
        
        <nav className="hidden xl:flex items-center gap-6">
          {['about', 'services', 'franchises', 'process', 'concierge', 'gateway', 'contact'].map((item) => (
            <Link 
              key={item} 
              href={`#${item}`}
              className="text-xs lg:text-sm font-medium text-neutral/70 hover:text-primary transition-colors duration-300 uppercase tracking-widest"
            >
              {t(item)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-primary hover:bg-white/5">
              <Globe className="w-5 h-5" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-32 border border-white/5 mt-2">
              {[
                { code: 'es', label: 'Español' },
                { code: 'en', label: 'English' },
                { code: 'ar', label: 'العربية' }
              ].map((lang) => (
                <li key={lang.code}>
                  <button onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'ar')} className="text-neutral hover:text-primary">
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
