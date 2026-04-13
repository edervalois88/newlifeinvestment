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
  'health':           { bg: 'bg-accent/10', text: 'text-accent' },
  'home':             { bg: 'bg-accent/10', text: 'text-accent' },
  'home-services':    { bg: 'bg-accent/10', text: 'text-accent' },
  'services':         { bg: 'bg-accent/10', text: 'text-accent' },
  'food':             { bg: 'bg-accent/10', text: 'text-accent' },
  'tech':             { bg: 'bg-accent/10', text: 'text-accent' },
  'beauty':           { bg: 'bg-accent/10', text: 'text-accent' },
  'recreation':       { bg: 'bg-accent/10', text: 'text-accent' },
  'automotive':       { bg: 'bg-accent/10', text: 'text-accent' },
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
