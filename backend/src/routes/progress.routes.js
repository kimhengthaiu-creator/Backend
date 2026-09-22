import { Router } from 'express';
import { progressController } from '../controllers/progress.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(requireAuth);

router.get('/progress', progressController.getProgress);
router.post('/progress', progressController.updateProgress);

export default router;
