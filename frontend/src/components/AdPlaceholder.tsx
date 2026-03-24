import React from 'react';

export default function AdPlaceholder({ className = '', type = 'banner' }: { className?: string, type?: 'banner' | 'square' }) {
  const baseClasses = "flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-text-muted text-sm font-medium transition-colors";
  const typeClasses = type === 'banner' ? 'w-full h-[90px] max-w-[728px] mx-auto' : 'w-[300px] h-[250px] mx-auto';
  
  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`}>
      <span>Advertisement</span>
    </div>
  );
}
