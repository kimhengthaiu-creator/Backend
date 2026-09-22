import { progressService } from '../services/progress.service.js';

export const progressController = {
  async getProgress(req, res, next) {
    try {
      const progressData = await progressService.getUserProgress(req.userId);
      res.status(200).json({ success: true, data: progressData });
    } catch (err) {
      next(err);
    }
  },

  async updateProgress(req, res, next) {
    try {
      const updated = await progressService.saveProgress(req.userId, req.body);
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      next(err);
    }
  },
};
