import { useState, useEffect, useCallback, useRef } from 'react';
import { getProgress, saveProgress } from '../services/progress';
import { useSafeAuth } from './useSafeAuth';

export const useProgress = (lessonId) => {
  const { getToken } = useSafeAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [resumeTimestamp, setResumeTimestamp] = useState(0);
  const [loading, setLoading] = useState(true);

  // Keep ref to latest values to avoid stale closures in callbacks
  const isCompletedRef = useRef(isCompleted);
  isCompletedRef.current = isCompleted;

  const resumeTimestampRef = useRef(resumeTimestamp);
  resumeTimestampRef.current = resumeTimestamp;

  useEffect(() => {
    let isMounted = true;
    if (!lessonId) {
      setLoading(false);
      return;
    }

    const fetchLessonProgress = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        const records = await getProgress(token);

        if (!isMounted) return;

        if (Array.isArray(records)) {
          const matched = records.find(
            (p) => p.lessonId === lessonId || p.lesson?.id === lessonId
          );
          if (matched) {
            setIsCompleted(Boolean(matched.isCompleted));
            setResumeTimestamp(matched.resumeTimestamp || 0);
          }
        }
      } catch (err) {
        console.warn('Failed to load lesson progress:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLessonProgress();

    return () => {
      isMounted = false;
    };
  }, [lessonId, getToken]);

  const markComplete = useCallback(
    async (overrideVal) => {
      const nextCompleted =
        typeof overrideVal === 'boolean' ? overrideVal : !isCompletedRef.current;
      setIsCompleted(nextCompleted);

      if (!lessonId) return;

      try {
        const token = await getToken();
        await saveProgress(token, {
          lessonId,
          isCompleted: nextCompleted,
          resumeTimestamp: resumeTimestampRef.current,
        });
      } catch (err) {
        console.warn('Failed to update completion status:', err);
      }
    },
    [lessonId, getToken]
  );

  const saveTimestamp = useCallback(
    async (timestamp) => {
      if (typeof timestamp !== 'number' || timestamp < 0) return;
      const rounded = Math.floor(timestamp);
      setResumeTimestamp(rounded);

      if (!lessonId) return;

      try {
        const token = await getToken();
        await saveProgress(token, {
          lessonId,
          isCompleted: isCompletedRef.current,
          resumeTimestamp: rounded,
        });
      } catch (err) {
        console.warn('Failed to save timestamp progress:', err);
      }
    },
    [lessonId, getToken]
  );

  return {
    isCompleted,
    resumeTimestamp,
    loading,
    markComplete,
    saveTimestamp,
  };
};
