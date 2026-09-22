import { eq } from 'drizzle-orm';
import { db, isConfigured } from '../db/index.js';
import { lessons } from '../db/schema.js';
import { courseRepository } from './course.repository.js';

export const lessonRepository = {
  async findBySlug(slug) {
    if (isConfigured && db) {
      try {
        const found = await db.query.lessons.findFirst({
          where: eq(lessons.slug, slug),
          with: {
            module: {
              with: {
                course: true,
              },
            },
          },
        });
        if (found) return found;
      } catch (err) {
        console.warn('Database query failed, searching fallback data:', err.message);
      }
    }

    // Fallback: search across cached courses
    const allCourses = await courseRepository.findAll();
    for (const c of allCourses) {
      for (const m of c.modules || []) {
        const foundLesson = (m.lessons || []).find((l) => l.slug === slug);
        if (foundLesson) {
          return {
            ...foundLesson,
            module: {
              id: m.id,
              title: m.title,
              position: m.position,
              course: {
                id: c.id,
                title: c.title,
                slug: c.slug,
              },
            },
          };
        }
      }
    }
    return null;
  },

  async findById(id) {
    if (isConfigured && db) {
      try {
        const found = await db.query.lessons.findFirst({
          where: eq(lessons.id, id),
          with: {
            module: {
              with: {
                course: true,
              },
            },
          },
        });
        if (found) return found;
      } catch (err) {
        console.warn('Database query failed, searching fallback data:', err.message);
      }
    }

    const allCourses = await courseRepository.findAll();
    for (const c of allCourses) {
      for (const m of c.modules || []) {
        const foundLesson = (m.lessons || []).find((l) => l.id === id);
        if (foundLesson) {
          return {
            ...foundLesson,
            module: {
              id: m.id,
              title: m.title,
              position: m.position,
              course: {
                id: c.id,
                title: c.title,
                slug: c.slug,
              },
            },
          };
        }
      }
    }
    return null;
  },
};
