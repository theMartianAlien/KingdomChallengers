import { logError, logMessage } from "../util/logging.mjs";
import Players from "../models/Player.mjs";
import DiscordUtil from "../data/utils/DiscordUtil.mjs";
import PlayersUtil from "../data/utils/PlayersUtil.mjs";
import Player from "../models/Player.mjs";

const findAPlayer = async (req, res, next) => {
    try {
        logMessage("-----------findAPlayer--------------");
        const id = req.params.id;
        const player = await Players.findById(id);
        if (!player) {
            return res
                .status(404)
                .json({ message: 'Player no found: ' + id });
        }
        const playerData = {
            _id: player._id,
            discord_handle: player.discord_handle,
            display_name: player.display_name
        }
        logMessage("-----------findAPlayer--------------");
        res.json({ player: playerData, bets: [] });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findAllPlayers = async (req, res, next) => {
    try {
        logMessage("-----------findAllPlayers--------------");
        const players = await Players.find();
        if (!players || players.length === 0) {
            res.json("No players currently in the database.");
            return;
        }
        const newPlayers = players.map((player) => ({
            _id: player._id,
            discord_handle: player.discord_handle,
            display_name: player.display_name
        }));
        logMessage("-----------findAllPlayers--------------");
        res.json(newPlayers);
    } catch (error) {
        logError(error);
        next(error);
    }
}

const createNewPlayer = async (req, res, next) => {
    try {
        logMessage("-----------createNewPlayer--------------");

        const discord_handle = req?.body?.discord_handle ?? null;
        if (!discord_handle || discord_handle.length <= 4 || discord_handle.length >= 20) {
            logMessage("-----------discord_handle--------------");
            logMessage(discord_handle);
            return res.status(422).json({ message: "Unable to find add player" });
        }

        const display_name = req?.body?.display_name ?? null;
        if (!display_name || display_name.length <= 4 || display_name.length >= 20) {
            logMessage("-----------display_name--------------");
            logMessage(display_name);
            return res.status(422).json({ message: "Unable to find add player" });
        }

        const discordHandler = await DiscordUtil.findByDiscordHandle(discord_handle)
        if (!discordHandler) {
            return res.status(422).json({ message: "Unable to find discord user with that handler." });
        }

        const player = await PlayersUtil.findPlayerByDiscordHandleId(discordHandler._id);

        if (player) {
            return res.status(422).json({ message: "Unable to add player! Discord user already has a player tag. Request your key to Martian." });
        }

        const newPlayer = new Player({
            discord_handle: discord_handle,
            display_name: display_name,
            discord_handler_id: discordHandler._id
        });

        await newPlayer.save();

        logMessage("-----------createNewPlayer--------------");
        res.status(201).json({ message: 'Player added!' });
    } catch (error) {
        next(error);
    }
}

const updatePlayer = async (req, res, next) => {
    try {
        const id = req.params.id;

        
    let data = req.body;
        if (!data.handler) {
            return res.status(422).json({ message: "Unable to update player: " + data.handler });
        }

        const handler = await getAPlayer(data._id);

        if (!handler) {
            return res.status(422).json({ message: "Unable to update player: " + data.handler });
        }
        logMessage("replaceAPlayer called");
        await replaceAPlayer(data);
        res.status(201).json({ message: 'Player updated!', player: data });
    } catch (error) {
        next(error);
    }
}

const PlayerController = {
    findAPlayer,
    findAllPlayers,
    createNewPlayer,
    updatePlayer
}

export default PlayerController;