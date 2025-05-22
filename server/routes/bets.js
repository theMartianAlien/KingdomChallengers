import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import BetsController from '../controller/bets.mjs';

const router = express();

router.get('/', BetsController.findAllBets);
router.get('/:id', BetsController.findABet);
router.use(isAuthenticate);
router.get('/player/:id', BetsController.findAllBetsByPlayer);
router.patch('/:id', BetsController.updateBet);

export default router;