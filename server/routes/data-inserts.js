import express from 'express';
import { insertDiscordUsers, insertOldBets, insertPlayers } from '../util/insert.mjs';
import { isAdminAuthenticate } from '../util/auth.mjs';

const router = express();

router.use(isAdminAuthenticate);
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