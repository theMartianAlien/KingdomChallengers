import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeOne } from './mongo.mjs';
import { getDiscordHandler } from '../data/discord-users.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson(file) {
    try {
        const filePath = path.resolve(__dirname, `../data/${file}.json`);
        console.log(__dirname);
        const rawData = await readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return data;
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

export async function insertDiscordUsers() {
    const DISCORD_USERS = await readJson("discord");
    for (let i = 0; i < 1; i++) {
        const discordUser = DISCORD_USERS[i];
        await writeOne("discord_users", discordUser, { "discord_handle": discordUser.discord_handle });
    }
}

export async function insertPlayers() {
    const PLAYERS = await readJson("players");
    for (let i = 0; i < PLAYERS.length; i++) {
        const player = PLAYERS[i];
        const discordHandler = await getDiscordHandler(player.handler);
        const data = {
            ...player,
            discord_handler_id: discordHandler._id
        }

        await writeOne("players", data, { "handler": player.handler });
    }
}