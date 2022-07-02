import { Router } from 'express';
import { postWebhook, getWebhook } from '../controllers/webhook/index.js';

const router = Router();

router.get('/', getWebhook);
router.post('/', postWebhook);

export default router;
