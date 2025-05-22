import express from 'express';
import { addAPlayer, getAPlayer, getAPlayerByHandler, removeAPlayer, replaceAPlayer } from '../data/players.mjs';
import { getDiscordHandler } from '../data/discord-users.mjs';
import { isAdminAuthenticate } from '../util/auth.mjs';
import { logMessage } from '../util/logging.mjs';
import PlayerController from '../controller/player.mjs';

const router = express();

router.get('/', PlayerController.findAllPlayers);
router.get('/:id', PlayerController.findAPlayer);
router.use(isAdminAuthenticate);
router.post('/', PlayerController.createNewPlayer);

router.patch('/:id', PlayerController.updatePlayer);

router.delete('/:id', async (req, res, next) => {
    try {
        logMessage("removeAPlayer called");
        await removeAPlayer(req.params.id);
        res.status(201).json({ message: 'Player successfully deleted.' });
    } catch (error) {
        next(error);
    }
});

export default router;