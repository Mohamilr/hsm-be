import express from 'express';
import profile from '../controller/Profile';
import verify from '../controller/Verify';

const router = express.Router();

router.put('/:id', verify, profile);

export default router;
