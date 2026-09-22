import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CheckIcon,
  CodeLabIcon,
  HelpCircleIcon,
  ChevronDown,
} from '../ui/Icons';
import { ProgressBar } from '../ui/ProgressBar';

export const CurriculumSidebar = ({ course, currentLessonSlug }) => {
  const { slug: courseSlug } = useParams();
  const [expandedModuleId, setExpandedModuleId] = useState(
    course?.modules?.find((m) =>
      m.lessons?.some((l) => l.slug === currentLessonSlug)
    )?.id || course?.modules?.[0]?.id || null
  );

  const toggleModule = (modId) => {
    setExpandedModuleId((prev) => (prev === modId ? null : modId));
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-neutral-200 flex flex-col h-auto lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 border-b border-neutral-100">
        <Link
          to={`/courses/${courseSlug || course.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-primary-600 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to course
        </Link>

        {/* Course Info Card */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm ${
              course.iconBg || 'bg-neutral-900 text-white'
            }`}
          >
            {course.iconLetter}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-neutral-900 truncate">
              {course.title}
            </h3>
            <div className="mt-1">
              <ProgressBar
                percent={course.progressPercent || 35}
                height="h-1.5"
              />
              <span className="text-[10px] font-medium text-neutral-400 mt-0.5 block">
                {course.progressPercent || 35}% complete
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Module List */}
      <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {course.modules?.map((mod, index) => {
          const isExpanded = expandedModuleId === mod.id;
          const containsCurrentLesson = mod.lessons?.some(
            (l) => l.slug === currentLessonSlug
          );

          return (
            <div
              key={mod.id}
              className={`rounded-md border transition-all ${
                containsCurrentLesson
                  ? 'border-primary-500/40 bg-primary-50/20'
                  : 'border-transparent hover:bg-neutral-50'
              }`}
            >
              {/* Module row button */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="w-full p-2.5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                      mod.isCompleted
                        ? 'bg-primary-100 text-primary-600'
                        : containsCurrentLesson
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {mod.isCompleted ? (
                      <CheckIcon className="w-3.5 h-3.5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-semibold leading-tight ${
                        containsCurrentLesson
                          ? 'text-neutral-900'
                          : 'text-neutral-700'
                      }`}
                    >
                      {mod.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400">
                      {mod.duration}
                      {containsCurrentLesson && (
                        <span className="text-primary-600 font-medium ml-1">
                          • Now playing
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Nested Lessons */}
              {isExpanded && mod.lessons && (
                <div className="pl-6 pr-2 pb-2 pt-0.5 space-y-1">
                  {mod.lessons.map((lesson) => {
                    const isCurrent = lesson.slug === currentLessonSlug;

                    return (
                      <Link
                        key={lesson.id}
                        to={`/courses/${course.slug}/lessons/${lesson.slug}`}
                        className={`flex items-center justify-between p-2 rounded-md text-xs transition-colors ${
                          isCurrent
                            ? 'bg-primary-100/60 text-primary-700 font-semibold'
                            : 'text-neutral-600 hover:bg-neutral-100/80 hover:text-neutral-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isCurrent
                                ? 'bg-primary-500 ring-2 ring-primary-200'
                                : lesson.isCompleted
                                ? 'bg-primary-500'
                                : 'bg-neutral-300'
                            }`}
                          />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 shrink-0 ml-2">
                          {lesson.duration}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Promo & Help Cards */}
      <div className="p-3 border-t border-neutral-200 space-y-2 bg-neutral-50/50">
        <div className="p-2.5 rounded-md bg-white border border-neutral-200 flex items-center gap-2.5 hover:border-neutral-300 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CodeLabIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-xs font-semibold text-neutral-900">
              Session Code Lab
            </h5>
            <p className="text-[10px] text-neutral-400 truncate">
              Practice with real code & feedback
            </p>
          </div>
        </div>

        <div className="p-2.5 rounded-md bg-white border border-neutral-200 flex items-center gap-2.5 hover:border-neutral-300 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-md bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0">
            <HelpCircleIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-xs font-semibold text-neutral-900">Need help?</h5>
            <p className="text-[10px] text-neutral-400 truncate">
              Ask your instructor in community
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
