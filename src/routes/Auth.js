import express from 'express';
import login from '../controller/Login';
import signUp from '../controller/signUp';
const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);

export default router;
