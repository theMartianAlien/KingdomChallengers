import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import CounterChallengeController from '../controller/counter-challenge.mjs';

const router = express();

router.use(isAuthenticate);
router.post('/', CounterChallengeController.createCounterChallenge);
router.patch('/:id', CounterChallengeController.updateCounterChallenge);
router.delete('/:id', CounterChallengeController.deleteCounterChallenge);

export default router;