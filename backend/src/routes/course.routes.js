import { Router } from 'express';
import { courseController } from '../controllers/course.controller.js';

const router = Router();

router.get('/courses', courseController.getCourses);
router.get('/courses/:slug', courseController.getCourseBySlug);

export default router;
