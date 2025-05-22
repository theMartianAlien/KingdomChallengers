import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import Authentication from '../controller/auth.mjs';

const router = express();
router.post('/login', Authentication.login);
router.post('/register', Authentication.register);
router.post('/discord', Authentication.discord);
router.use(isAuthenticate);
router.get('/:id', Authentication.findAccountById);
router.patch('/:id', Authentication.updateAccount);

export default router;