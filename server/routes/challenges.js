import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import Challenges from '../controller/challenges.mjs';

const router = express();
router.get('/', Challenges.findAllChallenge);
router.get('/:id', Challenges.findChallenge);
router.use(isAuthenticate);
router.post('/', Challenges.createNewChallenge);
router.patch('/:id', Challenges.updateChallenge);
router.delete('/:id', Challenges.deleteChallenge);

export default router;