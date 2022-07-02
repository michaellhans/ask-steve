import { Router } from 'express';
import messages from './messages.js';
import webhook from './webhook.js';

const router = Router();

router.use('/webhook', webhook);
router.use('/messages', messages);

export default router;