import express from 'express';
import { authenticate } from '../middlewares/auth';
import { createAccount, getAccounts } from '../controllers/accountController';

const router = express.Router();
router.use(authenticate);

router.post('/', createAccount);
router.get('/', getAccounts);

export default router;
