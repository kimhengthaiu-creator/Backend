import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CurriculumSidebar } from '../components/lesson/CurriculumSidebar';
import { VideoPlayer } from '../components/lesson/VideoPlayer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  HomeIcon,
  ChevronRight,
  BookmarkIcon,
  ClockIcon,
  BarChartIcon,
  UsersIcon,
  CheckIcon,
  CodeLabIcon,
  LightbulbIcon,
  ExternalLinkIcon,
  ArrowLeft,
  ArrowRight,
} from '../components/ui/Icons';
import { useCourse } from '../hooks/useCourse';
import { useLesson } from '../hooks/useLesson';
import { useProgress } from '../hooks/useProgress';
import { MOCK_COURSES } from '../services/mockData';

export const Lesson = () => {
  const { slug, lessonSlug } = useParams();
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'notes'
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { course: fetchedCourse } = useCourse(slug);
  const { lesson: fetchedLesson } = useLesson(lessonSlug);

  const course =
    fetchedCourse ||
    MOCK_COURSES.find((c) => c.slug === slug) ||
    MOCK_COURSES[0];

  const currentLesson =
    fetchedLesson ||
    course.modules
      ?.flatMap((m) => m.lessons || [])
      ?.find((l) => l.slug === lessonSlug) ||
    course.modules?.[0]?.lessons?.[0] || {
      id: 'default-lesson',
      title: 'Data Fetching & Caching',
      slug: 'data-fetching-and-caching',
      duration: '28m',
      youtubeVideoId: 'VBLnB_uE5qM',
    };

  const { isCompleted, resumeTimestamp, markComplete, saveTimestamp } =
    useProgress(currentLesson?.id);

  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (resumeTimestamp > 0) {
      lastTimeRef.current = resumeTimestamp;
    }
  }, [resumeTimestamp]);

  // Periodic auto-save every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (lastTimeRef.current > 0 && currentLesson?.id) {
        saveTimestamp(lastTimeRef.current);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      if (lastTimeRef.current > 0 && currentLesson?.id) {
        saveTimestamp(lastTimeRef.current);
      }
    };
  }, [currentLesson?.id, saveTimestamp]);

  // Navigation helpers
  const allLessons = (course.modules || []).flatMap((m) => m.lessons || []);
  const currentIndex = allLessons.findIndex((l) => l.slug === currentLesson.slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Curriculum Sidebar */}
        <CurriculumSidebar
          course={course}
          currentLessonSlug={currentLesson.slug}
        />

        {/* Right: Main Lesson Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-5xl overflow-x-hidden text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-6">
            <Link to="/" className="hover:text-primary-600 transition-colors">
              <HomeIcon className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link to="/courses" className="hover:text-primary-600 transition-colors">
              All Courses
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link
              to={`/courses/${course.slug}`}
              className="hover:text-primary-600 transition-colors"
            >
              {course.title}
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <span className="text-neutral-900 font-semibold truncate max-w-xs">
              {currentLesson.title}
            </span>
          </nav>

          {/* Lesson Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <Badge variant="lesson" className="mb-2">
                {currentLesson.module?.title || 'Lesson'}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 leading-tight mb-2">
                {currentLesson.title}
              </h1>
              <p className="text-sm text-neutral-600 max-w-2xl">
                {currentLesson.summary ||
                  course.summary ||
                  'Learn through structured lessons and hands-on practices.'}
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-500 font-medium mt-4">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{currentLesson.durationFormatted || currentLesson.duration || '28m'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BarChartIcon className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{course.level || 'Intermediate'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UsersIcon className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{course.studentsCount || '3,426 students'}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 rounded-md border border-neutral-200 hover:border-neutral-300 bg-white text-neutral-600 hover:text-primary-600 shadow-sm transition-colors cursor-pointer"
              title="Bookmark lesson"
            >
              <BookmarkIcon
                className={`w-4 h-4 ${
                  isBookmarked ? 'text-primary-500' : 'text-neutral-500'
                }`}
                filled={isBookmarked}
              />
            </button>
          </div>

          {/* Video Player */}
          <div className="mb-8">
            <VideoPlayer
              videoId={currentLesson.youtubeVideoId || 'VBLnB_uE5qM'}
              title={currentLesson.title}
              startTime={resumeTimestamp}
              onTimeUpdate={(t) => {
                lastTimeRef.current = t;
              }}
            />
          </div>

          {/* Tabs: Lesson Content / Notes */}
          <div className="border-b border-neutral-200 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'content'
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Lesson Content
                {activeTab === 'content' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
                  activeTab === 'notes'
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                Notes
                {activeTab === 'notes' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            </div>

            {/* Mark as complete button */}
            <button
              type="button"
              onClick={() => markComplete()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <CheckIcon
                className={`w-3.5 h-3.5 ${
                  isCompleted ? 'text-emerald-700' : 'text-neutral-400'
                }`}
              />
            </button>
          </div>

          {/* Tab Content: Lesson Content */}
          {activeTab === 'content' && (
            <div className="space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Overview</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  In this lesson, you&apos;ll learn how Next.js handles data fetching
                  and caching in both Server and Client Components. We&apos;ll
                  explore different caching strategies and revalidation techniques
                  to build fast and scalable applications.
                </p>
              </div>

              {/* Session Code Lab Card */}
              <div className="p-5 rounded-lg bg-emerald-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                    <CodeLabIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-neutral-900">
                        Session Code Lab
                      </h4>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Interactive
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Open the code lab below to practice what you&apos;ve learned.
                      Write your code, see instant feedback!
                    </p>
                  </div>
                </div>

                <Button size="sm" icon={ArrowRight} iconPosition="right">
                  Open Lab
                </Button>
              </div>

              {/* Learning objectives checklist */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 mb-3">
                  In this lesson you will:
                </h4>
                <div className="space-y-2.5">
                  {[
                    'Understand the different data fetching methods in Next.js',
                    'Learn how caching works in Server Components',
                    'Implement revalidation and cache control',
                    'Optimize performance with advanced caching strategies',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-700">
                      <div className="w-4 h-4 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-4 rounded-lg bg-emerald-50/40 border border-emerald-200/50 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                  <LightbulbIcon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 mb-0.5">
                    Pro Tip
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Use caching and revalidation wisely to ensure your app stays
                    fast and data remains fresh without unnecessary requests.
                  </p>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 mb-3">
                  Resources
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-md bg-white border border-neutral-200 hover:border-primary-500/50 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        Next.js Documentation
                      </h5>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Official Next.js docs on data fetching.
                      </p>
                    </div>
                    <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 shrink-0 ml-2" />
                  </a>

                  <a
                    href="https://nextjs.org/docs/app/building-your-application/data-fetching/caching-and-revalidating"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-md bg-white border border-neutral-200 hover:border-primary-500/50 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        Caching Guide
                      </h5>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Deep dive into caching strategies.
                      </p>
                    </div>
                    <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 shrink-0 ml-2" />
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-md bg-white border border-neutral-200 hover:border-primary-500/50 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                        Example Repo
                      </h5>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Explore the source code for this lesson.
                      </p>
                    </div>
                    <ExternalLinkIcon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-600 shrink-0 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Notes */}
          {activeTab === 'notes' && (
            <div className="prose prose-sm max-w-none text-neutral-700 space-y-4">
              <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  Key Notes &amp; Code Snippets
                </h4>
                {currentLesson.notes ? (
                  <div className="text-xs text-neutral-600 mb-3 whitespace-pre-wrap leading-relaxed">
                    {currentLesson.notes}
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-neutral-600 mb-3">
                      Next.js extends the native <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">fetch</code> API on the server:
                    </p>
                    <pre className="p-3 rounded-md bg-neutral-900 text-emerald-400 text-xs font-mono overflow-x-auto">
{`// 1. Force cached data (default in static routes)
const res = await fetch('https://api.example.com/data', {
  cache: 'force-cache'
});

// 2. Opt out of caching (always dynamic)
const res = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// 3. Revalidate after 60 seconds (Incremental Static Regeneration)
const res = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
});`}
                    </pre>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Bottom Next/Prev Navigation controls */}
          <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to={
                prevLesson
                  ? `/courses/${course.slug}/lessons/${prevLesson.slug}`
                  : `/courses/${course.slug}`
              }
            >
              <Button variant="tertiary" size="sm" icon={ArrowLeft} iconPosition="left">
                Previous Lesson
              </Button>
            </Link>

            <div className="hidden sm:flex items-center gap-3 text-xs text-neutral-500">
              <CodeLabIcon className="w-4 h-4 text-primary-500" />
              <span>Interactive Session Lab Available</span>
            </div>

            <Link
              to={
                nextLesson
                  ? `/courses/${course.slug}/lessons/${nextLesson.slug}`
                  : `/courses/${course.slug}`
              }
            >
              <Button size="sm" icon={ArrowRight} iconPosition="right">
                Next Lesson
              </Button>
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
