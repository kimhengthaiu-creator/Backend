import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  ClockIcon,
  PlayIcon,
  CheckIcon,
  ArrowRight,
} from '../components/ui/Icons';
import { useSafeAuth } from '../hooks/useSafeAuth';
import { getCourses } from '../services/courses';
import { getProgress } from '../services/progress';
import { MOCK_COURSES } from '../services/mockData';

export const MyLearning = () => {
  const { getToken } = useSafeAuth();
  const [courses, setCourses] = useState([]);
  const [progressRecords, setProgressRecords] = useState([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        const [courseList, token] = await Promise.all([
          getCourses(),
          getToken(),
        ]);
        const progressList = token ? await getProgress(token) : null;

        if (!isMounted) return;

        if (Array.isArray(courseList) && courseList.length > 0) {
          setCourses(courseList);
        }
        if (Array.isArray(progressList)) {
          setProgressRecords(progressList);
        }
      } catch (err) {
        console.warn('Failed to load live data for MyLearning:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [getToken]);

  // Compute courses in progress by cross-referencing
  const defaultInProgress = MOCK_COURSES.filter((c) => c.progressPercent > 0);

  let inProgressCourses = defaultInProgress;
  let completedLessonsCount = 14;

  if (courses.length > 0 && progressRecords.length > 0) {
    const enriched = courses
      .map((c) => {
        const mockMatch = MOCK_COURSES.find((m) => m.slug === c.slug) || {};
        const courseProgress = progressRecords.filter(
          (p) =>
            p.lesson?.module?.course?.id === c.id ||
            p.lesson?.module?.courseId === c.id ||
            p.lesson?.courseId === c.id
        );

        const completed = courseProgress.filter((p) => p.isCompleted).length;
        const total = c.lessonsCount || 10;
        const percent = Math.min(100, Math.round((completed / total) * 100));

        // Find next resume lesson
        const lastProgress = courseProgress[courseProgress.length - 1];
        const resumeSlug =
          lastProgress?.lesson?.slug ||
          mockMatch.modules?.[4]?.lessons?.[1]?.slug ||
          mockMatch.modules?.[0]?.lessons?.[0]?.slug ||
          'data-fetching-and-caching';

        return {
          ...mockMatch,
          ...c,
          progressPercent: percent > 0 ? percent : mockMatch.progressPercent || 0,
          resumeSlug,
          iconBg: mockMatch.iconBg || 'bg-neutral-900 text-white',
          iconLetter: mockMatch.iconLetter || c.title?.charAt(0) || 'C',
          badge: mockMatch.badge || 'Popular',
        };
      })
      .filter((c) => c.progressPercent > 0);

    if (enriched.length > 0) {
      inProgressCourses = enriched;
      completedLessonsCount = progressRecords.filter((p) => p.isCompleted).length;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        {/* Page Title Header */}
        <div className="mb-8">
          <Badge variant="popular" className="mb-2">
            Learner Dashboard
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900">
            My Learning
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Pick up right where you left off and track your course completion.
          </p>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <PlayIcon className="w-5 h-5 fill-current" filled />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {inProgressCourses.length}
              </div>
              <div className="text-xs text-neutral-500">Courses in Progress</div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
              <CheckIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900">
                {completedLessonsCount}
              </div>
              <div className="text-xs text-neutral-500">Completed Lessons</div>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-900">12.5 hrs</div>
              <div className="text-xs text-neutral-500">Time Invested</div>
            </div>
          </div>
        </div>

        {/* In Progress Courses List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Continue Learning
          </h2>

          <div className="space-y-4">
            {inProgressCourses.map((course) => (
              <div
                key={course.id}
                className="p-6 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-xl shrink-0 shadow-sm ${
                      course.iconBg || 'bg-neutral-900 text-white'
                    }`}
                  >
                    {course.iconLetter}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-neutral-900 hover:text-primary-600 transition-colors">
                        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>
                      <Badge variant="popular">{course.badge}</Badge>
                    </div>

                    <p className="text-xs text-neutral-500 line-clamp-1 mb-3">
                      {course.summary}
                    </p>

                    <div className="max-w-md">
                      <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-1">
                        <span>Progress</span>
                        <span className="text-primary-600">
                          {course.progressPercent}% complete
                        </span>
                      </div>
                      <ProgressBar percent={course.progressPercent} height="h-2" />
                    </div>
                  </div>
                </div>

                {/* Right CTA Button */}
                <div className="shrink-0 w-full md:w-auto">
                  <Link
                    to={`/courses/${course.slug}/lessons/${
                      course.resumeSlug ||
                      course.modules?.[4]?.lessons?.[1]?.slug ||
                      course.modules?.[0]?.lessons?.[0]?.slug ||
                      'data-fetching-and-caching'
                    }`}
                  >
                    <Button
                      size="md"
                      className="w-full md:w-auto"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Resume Lesson
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
