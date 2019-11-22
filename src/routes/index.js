import express from 'express';
import auth from './Auth';
import profile from '../controller/Profile';
import verify from '../controller/Verify';
const router = express.Router();

router.use('/auth', auth);
router.put('/profile/:id', verify, profile);

export default router;
