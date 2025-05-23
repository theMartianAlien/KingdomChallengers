import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import ChallengesController from '../controller/challenges.mjs';

const router = express();

router.get('/', ChallengesController.findAllChallenge);
router.get('/:id', ChallengesController.findChallenge);
router.use(isAuthenticate);
router.post('/', ChallengesController.createNewChallenge);
router.patch('/:id', ChallengesController.updateChallenge);
router.patch('/lock/:id', ChallengesController.lockChallenge);
router.delete('/:id', ChallengesController.deleteChallenge);

export default router;