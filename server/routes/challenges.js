import express from 'express';
import { addChallenge, getAllChallenges } from '../data/challenge.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        console.log("getAllChallenges called");
        const challenges = await getAllChallenges();
        res.json({ challenges });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        console.log("getChallenge called");
        const id = req.params.id;
        const challenge = await getChallenge(id);
        // const counters = await getCounterChallenge(id);
        // const players = await getAllPlayers();
        // res.json({ challenge, counters, players });
        res.json({ challenge });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log("addChallenge called");
        await addChallenge(req.body);
        res.status(201).json({ message: 'Challenge issued' });
    } catch (error) {
        next(error);
    }
});

export default router;