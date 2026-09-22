import { useState, useEffect } from 'react';
import { getLessonBySlug } from '../services/lessons';
import { MOCK_COURSES } from '../services/mockData';

const DEFAULT_FALLBACK_LESSON = {
  id: 'default-lesson',
  title: 'Data Fetching & Caching',
  slug: 'data-fetching-and-caching',
  duration: '28m',
  youtubeVideoId: 'VBLnB_uE5qM',
  notes: 'Key notes on Next.js data fetching and caching strategies.',
};

export const useLesson = (lessonSlug) => {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchLesson = async () => {
      try {
        const data = await getLessonBySlug(lessonSlug);
        if (!isMounted) return;

        if (data) {
          setLesson(data);
        } else {
          // Fallback to mock search
          const foundInMock = MOCK_COURSES.flatMap((c) => c.modules || [])
            .flatMap((m) => m.lessons || [])
            .find((l) => l.slug === lessonSlug);

          setLesson(foundInMock || DEFAULT_FALLBACK_LESSON);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err);
        const foundInMock = MOCK_COURSES.flatMap((c) => c.modules || [])
          .flatMap((m) => m.lessons || [])
          .find((l) => l.slug === lessonSlug);

        setLesson(foundInMock || DEFAULT_FALLBACK_LESSON);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (lessonSlug) {
      fetchLesson();
    } else {
      setLesson(DEFAULT_FALLBACK_LESSON);
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [lessonSlug]);

  return { lesson, loading, error };
};
