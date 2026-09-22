import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  SearchIcon,
  PlayIcon,
  ExternalLinkIcon,
  ChevronDown,
  ArrowRight,
} from '../components/ui/Icons';

export const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('data fetching');
  const [selectedSort, setSelectedSort] = useState('Most Relevant');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-1 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Search header badge and title */}
        <div className="text-center mb-8">
          <Badge variant="popular" className="mb-3">
            Search Results
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-2">
            Results for{' '}
            <span className="text-primary-500">
              &quot;{searchQuery || 'all courses'}&quot;
            </span>
          </h1>
          <p className="text-sm text-neutral-500">
            Found 28 results across 8 courses
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-4 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, lessons, topics..."
              className="w-full h-11 pl-11 pr-16 bg-white rounded-md border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 shadow-sm"
            />
            <div className="absolute right-3 px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-semibold text-neutral-500 border border-neutral-200">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
          <span className="text-sm font-semibold text-neutral-900">
            28 results
          </span>

          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              aria-label="Sort search results"
              className="appearance-none bg-white border border-neutral-200 rounded-md py-1.5 pl-3 pr-8 text-xs font-medium text-neutral-700 hover:border-neutral-300 focus:outline-none focus:border-primary-500 cursor-pointer shadow-sm"
            >
              <option>Most Relevant</option>
              <option>Newest</option>
              <option>Duration: Short to Long</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {/* Result 1: Video Lesson Card */}
          <div className="p-5 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-56 aspect-video bg-neutral-900 rounded-md overflow-hidden shrink-0 flex items-center justify-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayIcon className="w-4 h-4 ml-0.5 fill-current" filled />
              </div>
              <span className="absolute bottom-2 right-2 bg-neutral-900/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                12:45
              </span>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center">
                    N
                  </span>
                  <span className="text-xs font-medium text-neutral-500">
                    Next.js for Production
                  </span>
                </div>
                <Badge variant="video">Video</Badge>
              </div>

              <h3 className="text-base font-bold text-neutral-900 hover:text-primary-600 transition-colors mb-1">
                <Link to="/courses/nextjs-for-production/lessons/data-fetching-and-caching">
                  Data Fetching in Server Components
                </Link>
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                Learn how to fetch data on the server using async/await and Next.js
                best practices for better performance.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                <span className="text-neutral-400">
                  Lesson 5.1 • Data Fetching & Caching
                </span>
                <Link
                  to="/courses/nextjs-for-production/lessons/data-fetching-and-caching"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700"
                >
                  <PlayIcon className="w-3.5 h-3.5 fill-current" filled />
                  Watch from 12:45
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Result 2: Video Lesson Card */}
          <div className="p-5 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-56 aspect-video bg-neutral-800 rounded-md overflow-hidden shrink-0 flex items-center justify-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayIcon className="w-4 h-4 ml-0.5 fill-current" filled />
              </div>
              <span className="absolute bottom-2 right-2 bg-neutral-900/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                08:32
              </span>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-cyan-100 text-cyan-700 text-[10px] font-bold flex items-center justify-center">
                    ⚛️
                  </span>
                  <span className="text-xs font-medium text-neutral-500">
                    React Complete Guide
                  </span>
                </div>
                <Badge variant="video">Video</Badge>
              </div>

              <h3 className="text-base font-bold text-neutral-900 hover:text-primary-600 transition-colors mb-1">
                <Link to="/courses/react-complete-guide">
                  Fetching Data with useEffect
                </Link>
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                Understand how to fetch data in React components using useEffect
                and handle loading states, errors, and cleanup.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                <span className="text-neutral-400">
                  Lesson 7.2 • Data Fetching & Caching
                </span>
                <Link
                  to="/courses/react-complete-guide"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:text-primary-700"
                >
                  <PlayIcon className="w-3.5 h-3.5 fill-current" filled />
                  Watch from 08:32
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Result 3: Text Lesson Card */}
          <div className="p-5 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-56 p-4 bg-neutral-50 rounded-md border border-neutral-200/80 shrink-0 text-left">
              <ul className="text-xs text-neutral-600 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  Fetching strategies
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  Caching techniques
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  Revalidation methods
                </li>
              </ul>
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center">
                    N
                  </span>
                  <span className="text-xs font-medium text-neutral-500">
                    Next.js for Production
                  </span>
                </div>
                <Badge variant="lesson">Lesson</Badge>
              </div>

              <h3 className="text-base font-bold text-neutral-900 hover:text-primary-600 transition-colors mb-1">
                <Link to="/courses/nextjs-for-production">
                  Data Fetching & Caching
                </Link>
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-4">
                Explore different data fetching methods in Next.js and how to
                cache and revalidate data for optimal performance.
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                <span className="text-neutral-400">Module 5</span>
                <Link
                  to="/courses/nextjs-for-production"
                  className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-primary-600"
                >
                  View lesson
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 rounded-lg bg-emerald-50/50 border border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h4 className="text-sm font-bold text-neutral-900 mb-0.5">
              Can&apos;t find what you&apos;re looking for?
            </h4>
            <p className="text-xs text-neutral-500">
              Try different keywords or browse our full course catalog.
            </p>
          </div>
          <Link to="/">
            <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
              Browse all courses
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};
