import { Router } from 'express';
import { HistoryController } from '../controllers/historyController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/', requireAuth, HistoryController.getHistory);
router.get('/:id', requireAuth, HistoryController.getAnalysisById);
router.delete('/:id', requireAuth, HistoryController.deleteAnalysis);

export default router;
