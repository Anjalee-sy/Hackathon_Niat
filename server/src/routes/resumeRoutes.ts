import { Router } from 'express';
import { ResumeController } from '../controllers/resumeController';
import { requireAuth } from '../middleware/authMiddleware';
import { uploadSingleResume } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/upload', requireAuth, uploadSingleResume, ResumeController.upload);
router.post('/analyze', requireAuth, ResumeController.analyze);
router.post('/ats', requireAuth, ResumeController.analyze);

export default router;
