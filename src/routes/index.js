import express from 'express';
import auth from './Auth';
import profile from './Profile';

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);

export default router;
