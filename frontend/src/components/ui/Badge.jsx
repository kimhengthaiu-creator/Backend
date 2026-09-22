import React from 'react';
import { PlayIcon, FlameIcon } from './Icons';

export const Badge = ({
  children,
  variant = 'default',
  icon = null,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase';

  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-100 text-primary-600',
    video: 'bg-primary-100 text-primary-600',
    lesson: 'bg-primary-100 text-primary-600',
    popular: 'bg-primary-100 text-primary-600',
    beginner: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
    trending: 'bg-sky-50 text-sky-700 border border-sky-200/50',
  }[variant] || 'bg-neutral-100 text-neutral-700';

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {variant === 'video' && <PlayIcon className="w-3 h-3 fill-current" filled />}
      {variant === 'popular' && <FlameIcon className="w-3.5 h-3.5" />}
      {icon}
      {children}
    </span>
  );
};
