import express from 'express';
import { authenticate } from '../middlewares/auth';
import { transferFunds } from '../controllers/transactionController';

const router = express.Router();
router.use(authenticate);

router.post('/', transferFunds);

export default router;
