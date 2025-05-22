import express from 'express';
import StatisticsController from '../controller/statistics.mjs';

const router = express();

router.get('/', StatisticsController.homeStats);

export default router;