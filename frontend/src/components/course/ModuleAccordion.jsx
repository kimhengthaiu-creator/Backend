import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, PlayIcon, CheckIcon, ClockIcon } from '../ui/Icons';

export const ModuleAccordion = ({ modules = [], courseSlug = '' }) => {
  const [openModuleId, setOpenModuleId] = useState(modules[0]?.id || null);
  const [showAll, setShowAll] = useState(false);

  const displayedModules = showAll ? modules : modules.slice(0, 6);

  const toggleModule = (id) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {displayedModules.map((mod, index) => {
        const isOpen = openModuleId === mod.id;
        return (
          <div
            key={mod.id}
            className="border border-neutral-200 rounded-md bg-white overflow-hidden transition-all"
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => toggleModule(mod.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    mod.isCompleted
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {mod.isCompleted ? (
                    <CheckIcon className="w-4 h-4 text-primary-600" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {mod.lessons?.length || 0} lessons
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-neutral-500">
                  {mod.duration}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* Expanded lessons list */}
            {isOpen && (
              <div className="px-5 pb-4 pt-1 border-t border-neutral-100 divide-y divide-neutral-100">
                {mod.lessons && mod.lessons.length > 0 ? (
                  mod.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/courses/${courseSlug}/lessons/${lesson.slug}`}
                      className="py-3 flex items-center justify-between group hover:text-primary-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            lesson.isCompleted
                              ? 'bg-primary-50 text-primary-600'
                              : 'bg-neutral-100 text-neutral-400 group-hover:bg-primary-50 group-hover:text-primary-600'
                          }`}
                        >
                          {lesson.isCompleted ? (
                            <CheckIcon className="w-3.5 h-3.5" />
                          ) : (
                            <PlayIcon className="w-2.5 h-2.5 ml-0.5 fill-current" filled />
                          )}
                        </div>
                        <span className="text-xs font-medium text-neutral-800 group-hover:text-primary-600">
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <ClockIcon className="w-3 h-3" />
                        <span>{lesson.duration}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="py-3 text-xs text-neutral-400 italic">
                    Lessons in this module are coming soon.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}

      {modules.length > 6 && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors"
          >
            <span>{showAll ? 'Show fewer modules' : `Show all ${modules.length} modules`}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                showAll ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
};
