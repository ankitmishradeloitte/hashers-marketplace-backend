import { Router } from 'express';
import { initiateTransaction, manageTransaction, rateTransaction } from '../controllers/transactionControllers';
import authMiddleware from '../middleware/authmiddleware';

const router = Router();

router.post('/', authMiddleware, initiateTransaction);
router.put('/:id', authMiddleware, manageTransaction);
router.put('/:id/rate', authMiddleware, rateTransaction);

export default router;
