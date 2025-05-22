import express from 'express';
import { isAdminAuthenticate } from '../util/auth.mjs';
import PlayerController from '../controller/player.mjs';

const router = express();

router.get('/', PlayerController.findAllPlayers);
router.get('/:id', PlayerController.findAPlayer);
router.use(isAdminAuthenticate);
router.post('/', PlayerController.createNewPlayer);
router.patch('/:id', PlayerController.updatePlayer);
router.delete('/:id', PlayerController.deletePlayer);

export default router;