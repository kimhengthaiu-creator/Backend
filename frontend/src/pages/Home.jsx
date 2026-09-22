import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CourseCard } from '../components/course/CourseCard';
import { Button } from '../components/ui/Button';
import {
  SparklesIcon,
  ArrowRight,
  CodeLabIcon,
  UsersIcon,
  ModulesIcon,
} from '../components/ui/Icons';
import { getCourses } from '../services/courses';
import { MOCK_COURSES } from '../services/mockData';

export const Home = () => {
  const [courses, setCourses] = useState(MOCK_COURSES);

  useEffect(() => {
    let isMounted = true;
    getCourses().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const enriched = data.map((c) => {
          const mockMatch = MOCK_COURSES.find((m) => m.slug === c.slug) || {};
          return {
            ...mockMatch,
            ...c,
            iconLetter: mockMatch.iconLetter || c.title?.charAt(0) || 'C',
            iconBg: mockMatch.iconBg || 'bg-neutral-900 text-white',
            level: mockMatch.level || 'Intermediate',
            badge: mockMatch.badge || 'Popular',
          };
        });
        setCourses(enriched);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const popularCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-neutral-200/60 bg-gradient-to-b from-emerald-50/40 via-white to-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text & CTA */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold tracking-wide uppercase mb-6">
                  <SparklesIcon className="w-3.5 h-3.5 text-primary-600" />
                  <span>Intelligent Learning</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 tracking-tight leading-[1.15] mb-6">
                  Learn in a <span className="text-primary-500">smarter</span>,
                  <br />
                  <span className="text-primary-500">faster</span> way.
                </h1>

                <p className="text-base sm:text-lg text-neutral-500 leading-relaxed max-w-xl mb-8">
                  Vibe Learn helps you build real skills with structured courses,
                  hands-on practice, and personalized learning paths.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/courses">
                    <Button size="lg" icon={ArrowRight} iconPosition="right">
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Graphic */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="w-full max-w-md aspect-square relative flex items-center justify-center">
                  {/* Decorative background gradients */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 to-teal-100/30 rounded-full blur-3xl transform scale-90 -z-10" />

                  {/* Visual Laptop Mockup Illustration */}
                  <div className="relative w-72 sm:w-80 h-56 bg-neutral-900 rounded-xl p-3 shadow-2xl border-4 border-neutral-800 flex flex-col justify-between">
                    <div className="w-full h-full bg-neutral-800 rounded-lg p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center mb-3">
                        <CodeLabIcon className="w-8 h-8" />
                      </div>
                      <div className="h-2 w-32 bg-neutral-700 rounded-full mb-2" />
                      <div className="h-2 w-20 bg-neutral-700 rounded-full" />
                    </div>
                    <div className="h-2 w-16 bg-neutral-700 rounded-full mx-auto mt-2" />
                  </div>

                  {/* Floating floating badges */}
                  <div className="absolute -top-2 right-4 bg-white rounded-lg shadow-lg border border-neutral-100 p-3 flex items-center gap-2 animate-bounce duration-1000">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                      <span className="font-bold text-xs">95%</span>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-neutral-400 font-medium">Success Rate</div>
                      <div className="text-xs font-bold text-neutral-900">Career Ready</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-lg border border-neutral-100 p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                      ⚡
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-neutral-900">100+ Real Videos</div>
                      <div className="text-[10px] text-neutral-400">Curated & Tested</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Learning Paths Section */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2 block">
                — Our Courses
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
                Popular Learning Paths
              </h2>
              <p className="text-sm text-neutral-500 mt-2 max-w-xl">
                Choose from our curated courses and start your journey towards new
                skills and better opportunities.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <span className="font-display italic text-2xl text-primary-600 font-semibold hidden sm:inline-block">
                Learn Grow Achieve
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/courses">
              <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                View All Courses
              </Button>
            </Link>
          </div>
        </section>

        {/* Why Vibe Learn Section */}
        <section className="py-16 bg-white border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-2 block">
                  Why Vibe Learn?
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 leading-tight mb-4">
                  Build the skills that matter.
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  More than just courses — Vibe Learn gives you the tools, support,
                  and structure to grow your career and achieve your goals.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-200/80">
                  <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <UsersIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Expert-Led Content
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Learn from industry professionals with real-world experience and
                    proven expertise.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-200/80">
                  <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <CodeLabIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Hands-On Practice
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Build real projects and apply what you learn immediately with
                    guided exercises.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-200/80">
                  <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <ModulesIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Structured Learning Paths
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Follow clear paths from beginner to advanced without getting lost
                    or overwhelmed.
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-neutral-50 border border-neutral-200/80">
                  <div className="w-10 h-10 rounded-md bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                    <SparklesIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    Lifetime Access
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Learn at your own pace, anytime, anywhere. Pick up right where you
                    left off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
