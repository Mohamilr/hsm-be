import express from 'express';
import profile from '../controller/Profile';
import verify from '../middleware/verify';

const router = express.Router();

router.put('/:id', verify, profile.updateProfile);
router.get('/:id', verify, profile.fetchUserRecord);

export default router;
