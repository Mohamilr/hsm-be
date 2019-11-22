import express from 'express';
import profile from '../controller/Profile';
import verify from '../middleware/Verify';

const router = express.Router();

router.put('/:id', verify, profile);

export default router;
