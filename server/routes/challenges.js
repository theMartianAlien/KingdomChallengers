import express from 'express';
import { addChallenge, getAChallenge, getAllChallenges, updateChallenge } from '../data/challenge.mjs';
import { isAuthenticate } from '../util/auth.mjs';
import { getCounterChallenge } from '../data/counter-challenge.mjs';
import { getAllPlayers, getAPlayer, getAPlayerByHandler } from '../data/players.mjs';

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
        const challenge = await getAChallenge(id);
        let counters = await getCounterChallenge(id);
        if (counters.length > 0) {
            counters = await Promise.all(counters.map(async (counter) => {
                const player = await getAPlayer(counter.playerId);
                return {
                    ...counter,
                    player_name: player.display_name
                }
            }));
        }
        res.json({ challenge, counters });
    } catch (error) {
        next(error);
    }
});

// router.use(isAuthenticate);

router.post('/', async (req, res, next) => {
    try {
        console.log("addChallenge called");
        await addChallenge(req.body);
        res.status(201).json({ message: 'Challenge issued' });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        console.log("updateChallenge called");
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const challenge = await updateChallenge(data);
        res.status(201).json({ message: "Challenge updated" });
    } catch (error) {
        next(error);
    }
});

export default router;