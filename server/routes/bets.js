import express from 'express';
import { isAdminAuthenticate } from '../util/auth.mjs';
import BetsController from '../controller/bets.mjs';

const router = express();

router.get('/', BetsController.findAllBets);
router.get('/:id', BetsController.findABet);
router.use(isAdminAuthenticate);
router.get('/player/:id', BetsController.findAllBetsByPlayer);

export default router;