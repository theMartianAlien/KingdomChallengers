import { logError, logMessage } from "../util/logging.mjs";
import TestDataUtils from "../data/utils/TestDataUtils.mjs";
import Discord from "../models/Discord.mjs";
import DiscordUtil from '../data/utils/DiscordUtil.mjs';
import Player from "../models/Player.mjs";
import PlayerUtil from '../data/utils/PlayersUtil.mjs';
import Bets from "../models/Bets.mjs";
import BetsUtil from "../data/utils/BetsUtil.mjs";

const insertDiscordUsers = async (req, res, next) => {
    try {
        logMessage("-----------insertDiscordUsers--------------");
        const DISCORD_USERS = await TestDataUtils.insertDiscordUsers();
        for (let i = 0; i < DISCORD_USERS.length; i++) {
            const discordUser = DISCORD_USERS[i];
            const newDiscordUser = new Discord({
                user_key: discordUser.user_key,
                discord_handle: discordUser.discord_handle
            })

            const current = await DiscordUtil.findByDiscordHandle(discordUser.discord_handle);
            if(current){
                continue;
            }

            if (discordUser.isAdmin)
                newDiscordUser.isAdmin = true;

            await newDiscordUser.save();
        }
        logMessage("-----------insertDiscordUsers--------------");
        res.json('Inserting discord records complete');
    } catch (error) {
        logError(error);
        next(error);
    }
}

const insertPlayers = async (req, res, next) => {
    try {
        logMessage("-----------insertPlayers--------------");
        const PLAYERS = await TestDataUtils.insertPlayers();
        for (let i = 0; i < PLAYERS.length; i++) {
            const player = PLAYERS[i];
            const discordHandler = await DiscordUtil.findByDiscordHandle(player.discord_handle)
            if (!discordHandler) {
                logMessage("Player was not added: ");
                logMessage(player)
                continue;
            }
            const existingPlayer = await PlayerUtil.findPlayerByDiscordHandle(player.discord_handle);
            if (existingPlayer) {
                logMessage("Player was found: ");
                logMessage(existingPlayer)
                continue;
            }

            const newPlayer = new Player({
                discord_handle: player.discord_handle,
                display_name: player.display_name,
                discord_handler_id: discordHandler._id
            });

            await newPlayer.save();
        }
        logMessage("-----------insertPlayers--------------");
        res.json('Inserting players records');
    } catch (error) {
        logError(error);
        next(error);
    }
}

const insertBets = async (req, res, next) => {
    try {
        logMessage("-----------insertBets--------------");
        const BETS = await TestDataUtils.insertBets();
        const PLAYERS = await TestDataUtils.getOldPlayers();
        for (let i = 0; i < PLAYERS.length; i++) {
            const player = PLAYERS[i];
            if (player._id) {
                logMessage(player);
                continue;
            }
            if (!player.alternate.includes(player.name)) {
                logMessage(player);
                continue;
            }
            const aPlayer = await PlayerUtil.findPlayerByDiscordHandle(player.name);
            if (!aPlayer) {
                logMessage(player);
            }
        }
        logMessage("Inserting OLD BETS data");

        const allPlayers = await Player.find();
        for (let i = 0; i < BETS.length; i++) {
            // for (let i = 0; i < 1; i++) {
            const BET = BETS[i];
            let teamA;
            let teamB;
            try {
                teamA =
                    BET.players.teamA.map((team) => {
                        const oldPlayer = PLAYERS.find(p => p.id === team);
                        const player = allPlayers.find(p => p.discord_handle === oldPlayer.name);

                        if (!player) {
                            logMessage(oldPlayer);
                        }
                        return {
                            _id: player._id
                        }
                    });
                teamB =
                    BET.players.teamB.map((team) => {
                        const oldPlayer = PLAYERS.find(p => p.id === team);
                        const player = allPlayers.find(p => p.discord_handle === oldPlayer.name);

                        return {
                            _id: player._id
                        }
                    });
            } catch (error) {
                logMessage(BET);
                logMessage(error);
                continue;
            }
            var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            const aBet = await BetsUtil.findBetByLink(BET.link);
            if (aBet) {
                console.log(aBet);
                console.log("--------------------------------FOUND!-----------------------------------");
                console.log(BET);
                console.log("-------------------------------------------------------------------");
                continue;
            }

            const createNewBet = new Bets({
                title: BET.title,
                status: BET.status,
                teamA: teamA,
                teamB: teamB,
                text: BET.text,
                punishment: BET.punishment,
                link: BET.link,
                winner: !BET.winner || BET.winner.length == 0 ? "none" : BET.winner,
                chapter: BET.spoilers,
                "date-added": utc
            });

            await createNewBet.save();
            // console.log(createNewBet);
        }
        logMessage("-----------insertBets--------------");
        res.json('Inserting players records');
    } catch (error) {
        logError(error);
        next(error);
    }
}

const TestDataController = {
    insertDiscordUsers,
    insertPlayers,
    insertBets
}

export default TestDataController;