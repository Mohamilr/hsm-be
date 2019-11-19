import express from 'express';
import login from '../controller/Login';
const router = express.Router();

router.post('/login', login);

export default router;
