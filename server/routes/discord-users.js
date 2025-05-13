import express from 'express';
import { getAllDiscordUsers, getDiscordHandler, getDiscordHandlerUser, writeADiscordHandler } from '../data/discord-users.mjs';
import { isAdminAuthenticate, isAuthenticate } from '../util/auth.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        const players = await getAllDiscordUsers();
        const data = players.map((player) => player.discord_handle);
        console.log(data.join(','));
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.use(isAdminAuthenticate);

router.post('/', async (req, res, next) => {
    try {
        console.log("writeADiscordHandler called");
        const discordHandler = await getDiscordHandler(req.body.discord_handle);

        if (discordHandler) {
            console.log("this discord handle already in the database discord_handler");
            return res.status(401).json({ message: "Unable to add this discord handle" });
        }

        const user_key = await getDiscordHandlerUser(req.body.discord_handle, req.body.user_key);

        if (user_key) {
            console.log("this discord handle already in the database user_key");
            return res.status(401).json({ message: "Unable to add this discord handle" });
        }
        await writeADiscordHandler(req.body);
        res.status(201).json({ message: 'Discord handle added!' });
    } catch (error) {
        next(error);
    }
});

export default router;