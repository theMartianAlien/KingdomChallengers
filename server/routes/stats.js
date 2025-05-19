import express from 'express';
import { getStatistics } from '../data/stats.mjs';
import { logMessage } from '../util/logging.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        logMessage("getStatistics called");
        const statistics = await getStatistics();
        res.json(statistics);
    } catch (error) {
        next(error);
    }
});

export default router;