import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDiscordHandler, writeADiscordHandler, writeADiscordHandlerBy } from '../data/discord-users.mjs';
import { addAPlayerBy, getAllPlayers, getAllPlayersBy, getAPlayer, getAPlayerByDiscordHandle } from '../data/players.mjs';
import { addABetBy } from '../data/bets.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson(file) {
    try {
        const filePath = path.resolve(__dirname, `../data/old/${file}.json`);
        const rawData = await readFile(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return data;
    } catch (err) {
        console.error("An error occurred:", err);
    }
}

export async function insertDiscordUsers() {
    const DISCORD_USERS = await readJson("discord");
    for (let i = 0; i < DISCORD_USERS.length; i++) {
        const discordUser = DISCORD_USERS[i];
        await writeADiscordHandlerBy(discordUser, { "discord_handle": discordUser.discord_handle });
    }
}

export async function insertPlayers() {
    const PLAYERS = await readJson("players");
    for (let i = 0; i < PLAYERS.length; i++) {
        const player = PLAYERS[i];
        const discordHandler = await getDiscordHandler(player.discord_handle);
        if (!discordHandler) {
            console.log("Player was not added: ");
            console.log(player)
            continue;
        }
        const playerData = {
            ...player,
            discord_handler_id: discordHandler._id
        }
        await addAPlayerBy(playerData, { "discord_handle": player.discord_handle })
    }
}

export async function insertOldBets() {
    const BETS = await readJson("bets");
    const PLAYERS = await readJson("old-players");
    console.log("Players with missing data: ");
    for (let i = 0; i < PLAYERS.length; i++) {
        const player = PLAYERS[i];
        if (player._id) {
            console.log(player);
            continue;
        }
        if (!player.alternate.includes(player.name)) {
            console.log(player);
            continue;
        }
        const aPlayer = await getAPlayerByDiscordHandle(player.name);
        if (!aPlayer) {
            console.log(player);
        }
    }
    console.log("Inserting OLD BETS data");
    for (let i = 0; i < BETS.length; i++) {
        const BET = BETS[i];
        const allPlayers = await getAllPlayers();
        let teamA;
        let teamB;
        try {
            teamA =
                BET.players.teamA.map((team) => {
                    const oldPlayer = PLAYERS.find(p => p.id === team);
                    const player = allPlayers.find(p => p.discord_handle === oldPlayer.name);
                    if (!player) {
                        console.log(oldPlayer);
                    }
                    return {
                        player_id: player._id
                    }
                });
            teamB =
                BET.players.teamB.map((team) => {
                    const oldPlayer = PLAYERS.find(p => p.id === team);
                    const player = allPlayers.find(p => p.discord_handle === oldPlayer.name);
                    return {
                        player_id: player._id
                    }
                });
        } catch (error) {
            console.log(BET);
            console.log(error);
            continue;
        }
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        const betData = {
            title: BET.title,
            status: BET.status,
            teamA: teamA,
            teamB: teamB,
            text: BET.text,
            punishment: BET.punishment,
            link: BET.link,
            winner: BET.winner,
            chapter: BET.spoilers,
            "date-added": utc
        }
        await addABetBy(betData, { "link": betData.link })
    }
}