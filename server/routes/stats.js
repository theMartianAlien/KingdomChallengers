import express from 'express';
import { getStatistics } from '../data/stats.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        console.log("getStatistics called");
        const statistics = await getStatistics();
        res.json(statistics);
    } catch (error) {
        next(error);
    }
});
export default router;