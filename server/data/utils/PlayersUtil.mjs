import Players from "../../models/Player.mjs";

const findAllPlayersForChallenge = async (players) => {
    let validPlayers = [];
    if (players) {
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const validPlayer = await Players.findById(player);
            if (validPlayer) {
                validPlayers.push(validPlayer._id);
            }
        }
    }

    return validPlayers;
}

const findPlayerByDiscordHandleId = async (discord_handle_id) => {
    if (discord_handle_id) {
        return await Players.findOne({ "discord_handler_id": discord_handle_id }).exec();
    }

    return undefined;
}

const findPlayerAndUpdateDisplayName = async (discord_handle_id, nickname) => {
    const player = await findPlayerByDiscordHandleId(discord_handle_id);
    if (!player) {
        return player;
    }
    if (nickname) {
        let filter = { _id: player._id };
        await Players.findOneAndUpdate(filter, { "display_name": nickname });
    }
    return player
}

const PlayersUtil = {
    findAllPlayersForChallenge,
    findPlayerByDiscordHandleId,
    findPlayerAndUpdateDisplayName
}

export default PlayersUtil;