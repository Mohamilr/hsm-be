import { Router } from 'express';
import profile from '../controller/Profile';
import verify from '../controller/Verify';

const router = Router();

router.put('/:id', verify, profile);

export default router;