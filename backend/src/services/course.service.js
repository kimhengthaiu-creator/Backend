import { courseRepository } from '../repositories/course.repository.js';

export const courseService = {
  async getAllCourses() {
    const rawCourses = await courseRepository.findAll();

    return rawCourses.map((c) => {
      const allLessons = (c.modules || []).flatMap((m) => m.lessons || []);
      const totalDurationSec = allLessons.reduce(
        (acc, l) => acc + (l.duration || 300),
        0
      );
      const hours = Math.floor(totalDurationSec / 3600);
      const minutes = Math.floor((totalDurationSec % 3600) / 60);
      const formattedDuration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

      return {
        id: c.id,
        title: c.title,
        slug: c.slug,
        summary: c.summary,
        coverImageUrl: c.coverImageUrl,
        modulesCount: (c.modules || []).length,
        lessonsCount: allLessons.length,
        duration: formattedDuration,
        createdAt: c.createdAt,
      };
    });
  },

  async getCourseBySlug(slug) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      const error = new Error(`Course with slug "${slug}" not found`);
      error.statusCode = 404;
      throw error;
    }

    const allLessons = (course.modules || []).flatMap((m) => m.lessons || []);
    const totalDurationSec = allLessons.reduce(
      (acc, l) => acc + (l.duration || 300),
      0
    );
    const hours = Math.floor(totalDurationSec / 3600);
    const minutes = Math.floor((totalDurationSec % 3600) / 60);

    return {
      ...course,
      modulesCount: (course.modules || []).length,
      lessonsCount: allLessons.length,
      duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
    };
  },
};
