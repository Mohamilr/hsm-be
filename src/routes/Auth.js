import express from 'express';
import login from '../controller/Login';
import signUp from '../controller/signUp';
import middleware from '../middleware/auth';
const router = express.Router();

router.post('/login', login);
router.post('/signup', middleware.signUp, signUp);

export default router;
