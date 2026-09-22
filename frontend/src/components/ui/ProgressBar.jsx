import React from 'react';

export const ProgressBar = ({
  percent = 0,
  showLabel = false,
  height = 'h-2',
  className = '',
}) => {
  const safePercent = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-neutral-500 font-medium mb-1.5">
          <span>Your Progress</span>
          <span className="font-semibold text-neutral-900">{safePercent}% complete</span>
        </div>
      )}
      <div className={`w-full bg-neutral-100 rounded-full overflow-hidden ${height}`}>
        <div
          className="bg-primary-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${safePercent}%` }}
        />
      </div>
    </div>
  );
};
