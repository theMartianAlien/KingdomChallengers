import express from 'express';
import DiscordController from '../controller/discord.mjs';
import { isAdminAuthenticate } from '../util/auth.mjs';

const router = express();

router.use(isAdminAuthenticate);
router.get('/', DiscordController.findAllDiscordUser);
router.post('/', DiscordController.createDiscordUser);
router.get('/:id', DiscordController.findADiscordUser);
router.patch('/:id', DiscordController.updateDiscordUser);
router.delete('/:id', DiscordController.deleteDiscordUser);

export default router;