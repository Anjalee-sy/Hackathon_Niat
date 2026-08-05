import { Router } from 'express';
import { CoverLetterController } from '../controllers/coverLetterController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, CoverLetterController.generate);

export default router;
