import express from 'express';
import { getAllDiscordUsers } from '../data/discord-users.mjs';

const router = express();

router.get('/discord', async (req, res, next) => {
    try {
        const players = await getAllDiscordUsers();
        const data = players.map((player) => player.discord_handle);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

export default router;