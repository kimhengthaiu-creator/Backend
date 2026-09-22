import { lessonRepository } from '../repositories/lesson.repository.js';

export const lessonService = {
  async getLessonBySlug(slug) {
    const lesson = await lessonRepository.findBySlug(slug);
    if (!lesson) {
      const error = new Error(`Lesson with slug "${slug}" not found`);
      error.statusCode = 404;
      throw error;
    }

    const durationSec = lesson.duration || 300;
    const minutes = Math.floor(durationSec / 60);

    return {
      ...lesson,
      durationFormatted: `${minutes}m`,
    };
  },
};
