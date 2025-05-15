import express from 'express';
import { addChallenge, getAChallenge, getAllChallenges } from '../data/challenge.mjs';
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
        
        counters = await Promise.all(counters.map(async (counter) => {
            console.log(counter);
            const account = await getAPlayer(counter.playerId);
            return {
                ...challenge,
                player_name: account.account
            }
        }));
        res.json({ challenge, counters });
    } catch (error) {
        next(error);
    }
});

router.use(isAuthenticate);

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