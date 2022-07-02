import { Router } from 'express';
import { list, show, create } from '../controllers/messages/index.js';

const router = Router();

router.get('/', list);
router.post('/create', create);
router.get('/:id', show);

export default router;
