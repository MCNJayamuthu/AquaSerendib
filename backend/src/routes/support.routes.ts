import { Router } from 'express';
import { submitSupportMessage } from '../controllers/support.controller';

const router = Router();

router.post('/', submitSupportMessage);

export default router;