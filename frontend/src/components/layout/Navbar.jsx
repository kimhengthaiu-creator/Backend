import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { LogoMark, BellIcon } from '../ui/Icons';

export const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCoursesActive =
    location.pathname === '/' ||
    location.pathname.startsWith('/courses');
  const isMyLearningActive = location.pathname.startsWith('/my-learning');

  const hasClerkKey = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && !import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.includes('placeholder'));

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <LogoMark className="w-8 h-8 transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Vibe <span className="text-primary-500">Learn</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <Link
            to="/"
            className={`h-full flex items-center text-sm font-medium transition-colors relative ${
              isCoursesActive
                ? 'text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Courses
            {isCoursesActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
            )}
          </Link>
          <Link
            to="/my-learning"
            className={`h-full flex items-center text-sm font-medium transition-colors relative ${
              isMyLearningActive
                ? 'text-neutral-900 font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            My Learning
            {isMyLearningActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right side actions (Notifications & Clerk User) */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
          </button>

          {/* Clerk Auth Integration */}
          {hasClerkKey ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="h-9 px-4 text-xs font-semibold uppercase tracking-wider bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            /* Fallback avatar preview for UI inspection matching reference */
            <div className="flex items-center gap-2">
              <Link to="/my-learning" className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="User Profile"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-500/30 group-hover:ring-primary-500 transition-all"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isCoursesActive
                ? 'bg-primary-50 text-primary-600 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Courses
          </Link>
          <Link
            to="/my-learning"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isMyLearningActive
                ? 'bg-primary-50 text-primary-600 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            My Learning
          </Link>
        </div>
      )}
    </header>
  );
};
