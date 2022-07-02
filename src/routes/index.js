import { Router } from 'express';
import messages from './messages.js';
import webhook from './webhook.js';
import { summary } from '../controllers/messages/index.js';

const router = Router();

router.use('/webhook', webhook);
router.use('/messages', messages);
router.get('/summary', summary);

export default router;