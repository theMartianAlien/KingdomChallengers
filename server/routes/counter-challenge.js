import express from 'express';
import { getCounterChallengeById, updateCounterChallenge } from '../data/counter-challenge.mjs';
import { isAuthenticate } from '../util/auth.mjs';
import { addCounterChallenge, deleteCounterChallengeById } from '../controller/counter-challenge.mjs';

const router = express();

router.use(isAuthenticate);

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
        console.log("updateCounterChallenge called");
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

router.delete('/:id', async (req, res, next) => {
    try {
        console.log("deleteCounterChallenge called");
        const data = await deleteCounterChallengeById(req.params.id);
        res.status(201).json({ message: 'Counter Challenge Deleted!' });
    } catch (error) {
        next(error);
    }
});

export default router;