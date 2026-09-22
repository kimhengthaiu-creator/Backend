import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ModuleAccordion } from '../components/course/ModuleAccordion';
import {
  HomeIcon,
  ChevronRight,
  BookmarkIcon,
  BarChartIcon,
  ClockIcon,
  ModulesIcon,
  UsersIcon,
  ArrowRight,
  LightbulbIcon,
} from '../components/ui/Icons';
import { useCourse } from '../hooks/useCourse';
import { MOCK_COURSES } from '../services/mockData';

export const CourseDetail = () => {
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { course: fetchedCourse } = useCourse(slug);

  // Fall back to matching mock course or first course
  const course =
    fetchedCourse ||
    MOCK_COURSES.find((c) => c.slug === slug) ||
    MOCK_COURSES[0];

  const firstLessonSlug =
    course.modules?.[0]?.lessons?.[0]?.slug ||
    course.modules?.[4]?.lessons?.[1]?.slug ||
    'data-fetching-and-caching';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              <HomeIcon className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link to="/courses" className="hover:text-primary-600 transition-colors">
              All Courses
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span className="text-neutral-900 font-semibold">{course.title}</span>
          </nav>
        </div>

        {/* Course Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Graphic Cover Thumbnail */}
            <div className="lg:col-span-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 border border-neutral-700/60 shadow-xl flex flex-col items-center justify-center p-8 group">
                {/* Glow ring */}
                <div className="absolute w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                <div className="w-24 h-24 rounded-2xl bg-black border border-neutral-700 flex items-center justify-center text-4xl font-bold text-white shadow-2xl z-10">
                  {course.iconLetter}
                </div>
                <span className="mt-4 text-sm font-semibold tracking-widest text-neutral-300 uppercase z-10">
                  {course.title.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Right: Course Info & Actions */}
            <div className="lg:col-span-8 text-left">
              <div className="mb-3">
                <Badge variant="popular">{course.badge || 'Popular'}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 tracking-tight mb-4">
                Next.js for <span className="text-primary-500">Production</span>
              </h1>

              <p className="text-base text-neutral-600 leading-relaxed max-w-2xl mb-6">
                {course.summary}
              </p>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-medium pb-6 mb-6 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <BarChartIcon className="w-4 h-4 text-neutral-400" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-neutral-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ModulesIcon className="w-4 h-4 text-neutral-400" />
                  <span>{course.modulesCount} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-neutral-400" />
                  <span>{course.studentsCount} students</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to={`/courses/${course.slug}/lessons/${firstLessonSlug}`}>
                  <Button size="lg" icon={ArrowRight} iconPosition="right">
                    Continue Learning
                  </Button>
                </Link>

                <Button
                  variant="tertiary"
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  icon={() => (
                    <BookmarkIcon
                      className={`w-4 h-4 ${
                        isBookmarked ? 'text-primary-500' : 'text-neutral-500'
                      }`}
                      filled={isBookmarked}
                    />
                  )}
                  iconPosition="left"
                >
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What you'll learn Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <LightbulbIcon className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                What you&apos;ll learn
              </h2>
            </div>
            <span className="font-display italic text-lg text-primary-600 font-semibold hidden sm:inline-block">
              Build for real world
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {course.learningOutcomes?.map((outcome, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-white border border-neutral-200/80 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ModulesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 mb-1">
                    {outcome.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Course Content Curriculum Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <ModulesIcon className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Course Content
              </h2>
            </div>
            <span className="text-xs text-neutral-500 font-medium">
              {course.modules?.length || 12} modules • {course.duration}
            </span>
          </div>

          <div className="max-w-4xl mx-auto text-left">
            <ModuleAccordion modules={course.modules} courseSlug={course.slug} />
          </div>
        </section>

        {/* Sticky Bottom Progress Bar Banner */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-primary-50 text-primary-600 items-center justify-center shrink-0">
                <BarChartIcon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs font-semibold text-neutral-900 mb-1">
                  <span>Your Progress</span>
                  <span className="text-primary-600">
                    {course.progressPercent || 35}% complete
                  </span>
                </div>
                <ProgressBar percent={course.progressPercent || 35} height="h-2" />
              </div>
            </div>

            <Link to={`/courses/${course.slug}/lessons/${firstLessonSlug}`}>
              <Button size="md" icon={ArrowRight} iconPosition="right">
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
