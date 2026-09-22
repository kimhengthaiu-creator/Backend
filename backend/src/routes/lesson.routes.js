import { Router } from 'express';
import { lessonController } from '../controllers/lesson.controller.js';

const router = Router();

router.get('/lessons/:slug', lessonController.getLessonBySlug);

export default router;
