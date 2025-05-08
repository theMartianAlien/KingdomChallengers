import express from 'express';
import { addAPlayer, getAllPlayers, getAPlayer, getAPlayerByHandler, removeAPlayer, replaceAPlayer } from '../data/players.mjs';
import { getDiscordHandler } from '../data/discord-users.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        console.log("getAllPlayers called");
        const players = await getAllPlayers();

        if (!players || players.length === 0) {
            res.json("No players currently in the database.");
            return;
        }
        const newPlayers = players.map((player) => ({
            _id : player._id,
            handler: player.handler,
            display_name: player.display_name
        }));
        res.json(newPlayers);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        console.log("getAPlayer called");
        const id = req.params.id;
        const player = await getAPlayer(id);
        const playerData = {
            _id: player._id,
            handler: player.handler,
            display_name : player.display_name
        }
        res.json({ player : playerData });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        console.log("addAPlayer called");
        const discordHandler = await getDiscordHandler(req.body.handler);

        if (!discordHandler) {
            return res.status(422).json({ message: "Unable to find discord user with that handler." });
        }

        const player = await getAPlayerByHandler(discordHandler._id);

        if (player) {
            return res.status(422).json({ message: "Unable to add player! Discord user already has a player tag. Request your key to Martian." });
        }
        const data = {
            ...req.body,
            discord_handler_id: discordHandler._id
        }
        await addAPlayer(data);
        res.status(201).json({ message: 'Player added!' });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    const data = req.body;
    try {
        console.log("replaceAPlayer called");
        await replaceAPlayer(data);
        res.status(201).json({ message: 'Player updated!', player: data });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        console.log("removeAPlayer called");
        await removeAPlayer(req.params.id);
        res.status(201).json({ message: 'Player successfully deleted.' });
    } catch (error) {
        next(error);
    }
});

export default router;