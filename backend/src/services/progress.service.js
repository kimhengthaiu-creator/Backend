import { progressRepository } from '../repositories/progress.repository.js';
import { lessonRepository } from '../repositories/lesson.repository.js';

export const progressService = {
  async getUserProgress(userId) {
    if (!userId) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }
    return await progressRepository.findByUser(userId);
  },

  async saveProgress(userId, { lessonId, isCompleted, resumeTimestamp }) {
    if (!userId) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      throw error;
    }

    if (!lessonId) {
      const error = new Error('Lesson ID is required');
      error.statusCode = 400;
      throw error;
    }

    // Verify lesson exists
    const lesson = await lessonRepository.findById(lessonId);
    if (!lesson) {
      const error = new Error(`Lesson with ID "${lessonId}" not found`);
      error.statusCode = 404;
      throw error;
    }

    return await progressRepository.upsertProgress({
      userId,
      lessonId,
      isCompleted: typeof isCompleted === 'boolean' ? isCompleted : undefined,
      resumeTimestamp:
        typeof resumeTimestamp === 'number'
          ? Math.max(0, Math.floor(resumeTimestamp))
          : undefined,
    });
  },
};
