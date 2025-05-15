import express from 'express';
import { addCounterChallenge } from '../data/counter-challenge.mjs';

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

export default router;