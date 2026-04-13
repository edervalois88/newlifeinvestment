'use client';

import React from 'react';

interface FranchiseAvatarProps {
  name: string;
  shortName: string;
  category: string;
  logo?: string;
  className?: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'health':           { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300' },
  'home':             { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300' },
  'home-services':    { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300' },
  'services':         { bg: 'bg-sky-100 dark:bg-sky-900/40', text: 'text-sky-700 dark:text-sky-300' },
  'food':             { bg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-300' },
  'tech':             { bg: 'bg-violet-100 dark:bg-violet-900/40', text: 'text-violet-700 dark:text-violet-300' },
  'beauty':           { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-300' },
  'recreation':       { bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-700 dark:text-indigo-300' },
  'automotive':       { bg: 'bg-slate-100 dark:bg-slate-900/40', text: 'text-slate-700 dark:text-slate-300' },
};

export default function FranchiseAvatar({ name, shortName, category, logo, className = '' }: FranchiseAvatarProps) {
  const colors = categoryColors[category] || categoryColors['services'];

  // If logo exists, show it
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className={`object-cover ${className}`}
        onError={(e) => {
          // Fallback to initials if logo fails to load
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  // Get initials from shortName
  const initials = shortName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center justify-center font-bold text-lg ${colors.bg} ${colors.text} ${className}`}>
      {initials}
    </div>
  );
}
