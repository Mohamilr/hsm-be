import express from 'express';
import verify from '../middleware/verify';
import profile from '../controller/Profile';

const router = express.Router();

router.put('/:id', verify, profile);

export default router;
