import { eq, and } from 'drizzle-orm';
import { db, isConfigured } from '../db/index.js';
import { progress, users } from '../db/schema.js';

// In-memory fallback map for progress when live DB is not yet connected
const fallbackProgressStore = new Map();

export const progressRepository = {
  async findByUser(userId) {
    if (isConfigured && db) {
      try {
        return await db.query.progress.findMany({
          where: eq(progress.userId, userId),
          with: {
            lesson: {
              with: {
                module: {
                  with: {
                    course: true,
                  },
                },
              },
            },
          },
        });
      } catch (err) {
        console.warn('Database progress query failed, using in-memory store:', err.message);
      }
    }

    return Array.from(fallbackProgressStore.values()).filter(
      (p) => p.userId === userId
    );
  },

  async findByUserAndLesson(userId, lessonId) {
    if (isConfigured && db) {
      try {
        return await db.query.progress.findFirst({
          where: and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)),
        });
      } catch (err) {
        console.warn('Database progress query failed, using in-memory store:', err.message);
      }
    }

    const key = `${userId}:${lessonId}`;
    return fallbackProgressStore.get(key) || null;
  },

  async upsertProgress({ userId, lessonId, isCompleted, resumeTimestamp }) {
    if (isConfigured && db) {
      try {
        // Ensure user exists first
        await db
          .insert(users)
          .values({ id: userId })
          .onConflictDoNothing();

        // Check if progress record exists
        const existing = await db.query.progress.findFirst({
          where: and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)),
        });

        if (existing) {
          const [updated] = await db
            .update(progress)
            .set({
              isCompleted:
                typeof isCompleted === 'boolean'
                  ? isCompleted
                  : existing.isCompleted,
              resumeTimestamp:
                typeof resumeTimestamp === 'number'
                  ? resumeTimestamp
                  : existing.resumeTimestamp,
              updatedAt: new Date(),
            })
            .where(eq(progress.id, existing.id))
            .returning();
          return updated;
        }

        const [inserted] = await db
          .insert(progress)
          .values({
            userId,
            lessonId,
            isCompleted: Boolean(isCompleted),
            resumeTimestamp: resumeTimestamp || 0,
          })
          .returning();
        return inserted;
      } catch (err) {
        console.warn('Database progress write failed, falling back to in-memory store:', err.message);
      }
    }

    // Fallback in-memory upsert
    const key = `${userId}:${lessonId}`;
    const existing = fallbackProgressStore.get(key);
    const record = {
      id: existing?.id || `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      userId,
      lessonId,
      isCompleted:
        typeof isCompleted === 'boolean'
          ? isCompleted
          : existing?.isCompleted || false,
      resumeTimestamp:
        typeof resumeTimestamp === 'number'
          ? resumeTimestamp
          : existing?.resumeTimestamp || 0,
      updatedAt: new Date().toISOString(),
    };
    fallbackProgressStore.set(key, record);
    return record;
  },
};
