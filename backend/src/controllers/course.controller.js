import { courseService } from '../services/course.service.js';

export const courseController = {
  async getCourses(req, res, next) {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json({ success: true, data: courses });
    } catch (err) {
      next(err);
    }
  },

  async getCourseBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const course = await courseService.getCourseBySlug(slug);
      res.status(200).json({ success: true, data: course });
    } catch (err) {
      next(err);
    }
  },
};
