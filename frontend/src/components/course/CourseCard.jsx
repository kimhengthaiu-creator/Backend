import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { BarChartIcon, ClockIcon, ModulesIcon, ArrowRight } from '../ui/Icons';

export const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group relative flex flex-col bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden text-left"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Top row: Icon and Arrow */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg shadow-sm ${
              course.iconBg || 'bg-neutral-900 text-white'
            }`}
          >
            {course.iconLetter}
          </div>
          <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-3">
          <Badge
            variant={
              course.badge?.toLowerCase() === 'popular'
                ? 'popular'
                : course.badge?.toLowerCase() === 'trending'
                ? 'trending'
                : 'beginner'
            }
          >
            {course.badge || 'Beginner'}
          </Badge>
        </div>

        {/* Title & Summary */}
        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
          {course.summary}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 font-medium pt-4 border-t border-neutral-100">
          <div className="flex items-center gap-1.5">
            <BarChartIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ModulesIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{course.modulesCount} modules</span>
          </div>
        </div>
      </div>

      {/* Green bottom accent bar */}
      <div className="h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
    </Link>
  );
};
