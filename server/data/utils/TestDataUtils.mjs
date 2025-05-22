import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson(file) {
    try {
        const filePath = path.resolve(__dirname, `../old/${file}.json`);
        const rawData = await readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return data;
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

async function insertDiscordUsers() {
    return await readJson("discord");
}

async function insertPlayers() {
    return await readJson("players");
}

async function getOldPlayers() {
    return await readJson("old-players");
}

async function insertBets(params) {
    return await readJson("bets");
}


const TestDataUtils = {
    insertDiscordUsers,
    insertPlayers,
    insertBets,
    getOldPlayers
}

export default TestDataUtils;