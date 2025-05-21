import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import { logMessage } from '../util/logging.mjs';
import { createNewChallenge, getValidChallenge, getValidChallenges, updateValidChallenge } from '../controller/challenges.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        logMessage("getValidChallenges called");
        const challenges = await getValidChallenges();
        res.json({ challenges });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        logMessage("getChallenge called");
        const id = req.params.id;
        const { challenge, counters } = await getValidChallenge(id);
        res.json({ challenge, counters });
    } catch (error) {
        next(error);
    }
});

router.use(isAuthenticate);

router.post('/', async (req, res, next) => {
    try {
        logMessage("createNewChallenge called");
        await createNewChallenge(req.body);
        res.status(201).json({ message: 'Challenge issued' });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const data = req.body;
        logMessage("updateValidChallenge called");
        updateValidChallenge({ _id: req.params.id, ...data });
        res.status(201).json({ message: "Challenge updated" });
    } catch (error) {
        next(error);
    }
});

export default router;