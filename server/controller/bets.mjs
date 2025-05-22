import { logError, logMessage } from "../util/logging.mjs";
import Bets from "../models/Bets.mjs";
import Player from "../models/Player.mjs";
import BetsUtil from "../data/utils/BetsUtil.mjs";

const findAllBets = async (req, res, next) => {
    try {
        logMessage("-----------findAllBets--------------");
        const bets = await Bets.find();
        if (!bets || bets.length === 0) {
            res.json("No bets currently in the database.");
            return;
        }
        logMessage("-----------findAllBets--------------");
        res.json(bets);
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findABet = async (req, res, next) => {
    try {
        const id = req.params.id;
        logMessage("-----------findABet--------------");
        const bet = await Bets.findById(id)
            .populate('teamA', '_id display_name')
            .populate('teamB', '_id display_name')
            .exec();

        const players = await Player.find();
        logMessage("-----------findABet--------------");
        res.json({ bet: bet, players });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findAllBetsByPlayer = async (req, res, next) => {
    try {
        const id = req.params.id;
        logMessage("-----------findAllBetsByPlayer--------------");

        const player = await Player.findById(id);
        if (player) {
            logMessage("-----------findAllBetsByPlayer--------------");
            return res
                .status(404)
                .json({ message: 'Player no found: ' + id });
        }

        const bets = await BetsUtil.findAllBetsByPlayer(player._id);
        logMessage("-----------findAllBetsByPlayer--------------");
        res.json({ bets });
    } catch (error) {
        next(error);
    }
}

const BetsController = {
    findAllBets,
    findABet,
    findAllBetsByPlayer
};

export default BetsController;