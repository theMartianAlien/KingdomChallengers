import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import AuthController from '../controller/auth.mjs';

const router = express();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/discord', AuthController.discord);
router.use(isAuthenticate);
router.get('/:id', AuthController.findAccountById);
router.patch('/:id', AuthController.updateAccount);

export default router;