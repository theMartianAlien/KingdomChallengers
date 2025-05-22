import express from 'express';
import { isAdminAuthenticate } from '../util/auth.mjs';
import TestDataController from '../controller/testdata-insert.mjs';

const router = express();

router.use(isAdminAuthenticate);
router.get('/discord', TestDataController.insertDiscordUsers);
router.get('/players', TestDataController.insertPlayers);
router.get('/bets', TestDataController.insertBets);

export default router;