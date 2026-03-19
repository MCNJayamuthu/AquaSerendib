import { Router } from 'express';
import { getSupportMessagesController, submitSupportMessage } from '../controllers/support.controller';

const router = Router();

router.post('/', submitSupportMessage);
router.get("/", getSupportMessagesController);

export default router;