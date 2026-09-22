import { eq, asc } from 'drizzle-orm';
import { db, isConfigured } from '../db/index.js';
import { courses, modules, lessons } from '../db/schema.js';
import { parseSeedData } from '../db/seed.js';

// Cached seed data for in-memory fallback when live DB is not yet connected
let fallbackCourses = null;

function getFallbackData() {
  if (!fallbackCourses) {
    const raw = parseSeedData();
    fallbackCourses = raw.map((c, cIdx) => {
      const courseId = `c0000000-0000-0000-0000-${String(cIdx + 1).padStart(12, '0')}`;
      const courseModules = c.modules.map((m, mIdx) => {
        const moduleId = `m0000000-0000-0000-0000-${String(cIdx * 100 + mIdx + 1).padStart(12, '0')}`;
        const moduleLessons = m.lessons.map((l, lIdx) => ({
          id: `l0000000-0000-0000-0000-${String(cIdx * 1000 + mIdx * 10 + lIdx + 1).padStart(12, '0')}`,
          moduleId,
          title: l.title,
          slug: l.slug,
          youtubeVideoId: l.youtubeVideoId,
          notes: l.notes,
          position: l.position,
          duration: l.duration,
        }));
        return {
          id: moduleId,
          courseId,
          title: m.title,
          position: m.position,
          lessons: moduleLessons,
        };
      });

      return {
        id: courseId,
        title: c.title,
        slug: c.slug,
        summary: c.summary,
        coverImageUrl: c.coverImageUrl,
        createdAt: new Date().toISOString(),
        modules: courseModules,
      };
    });
  }
  return fallbackCourses;
}

export const courseRepository = {
  async findAll() {
    if (isConfigured && db) {
      try {
        return await db.query.courses.findMany({
          orderBy: [asc(courses.createdAt)],
          with: {
            modules: {
              orderBy: [asc(modules.position)],
              with: {
                lessons: {
                  orderBy: [asc(lessons.position)],
                },
              },
            },
          },
        });
      } catch (err) {
        console.warn('Database query failed, falling back to seed data:', err.message);
      }
    }
    return getFallbackData();
  },

  async findBySlug(slug) {
    if (isConfigured && db) {
      try {
        const found = await db.query.courses.findFirst({
          where: eq(courses.slug, slug),
          with: {
            modules: {
              orderBy: [asc(modules.position)],
              with: {
                lessons: {
                  orderBy: [asc(lessons.position)],
                },
              },
            },
          },
        });
        if (found) return found;
      } catch (err) {
        console.warn('Database query failed, falling back to seed data:', err.message);
      }
    }
    return getFallbackData().find((c) => c.slug === slug) || null;
  },

  async findById(id) {
    if (isConfigured && db) {
      try {
        return await db.query.courses.findFirst({
          where: eq(courses.id, id),
          with: {
            modules: {
              orderBy: [asc(modules.position)],
              with: {
                lessons: {
                  orderBy: [asc(lessons.position)],
                },
              },
            },
          },
        });
      } catch (err) {
        console.warn('Database query failed, falling back to seed data:', err.message);
      }
    }
    return getFallbackData().find((c) => c.id === id) || null;
  },
};
