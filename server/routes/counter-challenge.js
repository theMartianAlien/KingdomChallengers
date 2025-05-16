import express from 'express';
import { addCounterChallenge, getCounterChallengeById, updateCounterChallenge } from '../data/counter-challenge.mjs';

const router = express();

router.post('/', async (req, res, next) => {
    try {
        console.log("addCounterChallenge called");
        await addCounterChallenge(req.body);
        res.status(201).json({ message: 'Counter Challenge issued' });
    } catch (error) {
        next(error);
    }
});


router.patch('/:id', async (req, res, next) => {
    try {
        console.log("addCounterChallenge called");
        let counter = await getCounterChallengeById(req.body._id);
        const _id = counter._id;
        delete counter._id;
        counter = {
            ...counter,
            action: req.body.action
        }
        await updateCounterChallenge(_id, counter);
        res.status(201).json({ message: 'Counter Updated!' });
    } catch (error) {
        next(error);
    }
});

export default router;