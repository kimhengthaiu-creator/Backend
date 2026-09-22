import { useState, useEffect } from 'react';
import { getCourseBySlug } from '../services/courses';
import { MOCK_COURSES } from '../services/mockData';

export const useCourse = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchCourse = async () => {
      try {
        const data = await getCourseBySlug(slug);
        if (!isMounted) return;

        if (data) {
          // Merge with mock course attributes for presentational fields if not present in DB
          const fallbackMock =
            MOCK_COURSES.find((c) => c.slug === slug) || MOCK_COURSES[0];
          setCourse({
            ...fallbackMock,
            ...data,
            description: data.summary || data.description || fallbackMock.description,
            modules: data.modules && data.modules.length > 0 ? data.modules : fallbackMock.modules,
          });
        } else {
          // Fallback to mock data
          const fallback =
            MOCK_COURSES.find((c) => c.slug === slug) || MOCK_COURSES[0];
          setCourse(fallback);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err);
        const fallback =
          MOCK_COURSES.find((c) => c.slug === slug) || MOCK_COURSES[0];
        setCourse(fallback);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { course, loading, error };
};
