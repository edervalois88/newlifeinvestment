'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const t = useTranslations('ThemeToggle');
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    startTransition(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      disabled={isPending}
      className="btn btn-ghost btn-circle header-icon-btn hover:text-[#8f6a2f] hover:bg-white/5 transition-colors"
      title={theme === 'light' ? t('switchToDark') : t('switchToLight')}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
