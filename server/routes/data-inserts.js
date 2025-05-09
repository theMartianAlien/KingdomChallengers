import express from 'express';
import { insertOldBets } from '../util/insert.mjs';

const router = express();

router.get('/discord', async (req, res) => {
    await insertDiscordUsers();
    res.json('Inserting discord records');
});
router.get('/players', async (req, res) => {
    await insertPlayers();
    res.json('Inserting players records');
});
router.get('/bets', async (req, res) => {
    await insertOldBets();
    res.json('Inserting bets records');
});

export default router;