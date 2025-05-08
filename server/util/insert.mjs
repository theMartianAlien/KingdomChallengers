import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeOne } from './mongo.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson() {
    try {
        const filePath = path.resolve(__dirname, '../data/discord.json');
        console.log(__dirname);
        const rawData = await readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return data;
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

export async function insertDiscordUsers() {
    const DISCORD_USERS = await readJson();
    for (let i = 0; i < 1; i++) {
        const discordUser = DISCORD_USERS[i];
        const returned = await writeOne("discord_users", discordUser, { "discord_handle": discordUser.discord_handle });
        console.log(returned);
    }
}