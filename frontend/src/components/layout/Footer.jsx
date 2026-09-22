import React from 'react';
import { LogoMark } from '../ui/Icons';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <LogoMark className="w-6 h-6" />
          <span className="text-lg font-bold tracking-tight text-neutral-900">
            Vibe <span className="text-primary-500">Learn</span>
          </span>
        </div>
        <p className="text-xs text-neutral-500 font-medium">
          Better Skills. A Brighter Future.
        </p>
      </div>
    </footer>
  );
};
