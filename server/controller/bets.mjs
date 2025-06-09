import { logError, logMessage } from "../util/logging.mjs";
import Bets from "../models/Bets.mjs";
import Player from "../models/Player.mjs";
import Challenge from "../models/Challenge.mjs";
import BetsUtil from "../data/utils/BetsUtil.mjs";

const createNewBet = async (req, res, next) => {
    try {
        logMessage("-----------createNewBet--------------");
        const challenge = await Challenge.findById(req.body.challengeId);

        if (!challenge) {
            return res
                .status(404)
                .json({ message: 'No challenge found' + req.body.challengeId });
        }

        if (challenge.converted) {
            return res
                .status(401)
                .json({ message: 'Challenge is already a Bet' });
        }

        challenge.converted = true;
        await challenge.save();

        const newBet = new Bets({
            title: req.body.title,
            status: req.body.status,
            teamA: req.body.teamA,
            teamB: req.body.teamB,
            text: req.body.text,
            punishment: req.body.punishment,
            challengeId: req.body.challengeId,
        });

        await newBet.save();

        logMessage("-----------createNewBet--------------");
        return res.json({ bet: newBet, message: "Bet added!" });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findAllBets = async (req, res, next) => {
    try {
        logMessage("-----------findAllBets--------------");
        const bets = await Bets.find()
            .populate('teamA', '_id display_name')
            .populate('teamB', '_id display_name')
            .exec();
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
            .populate('teamA', '_id display_name alternate_names')
            .populate('teamB', '_id display_name alternate_names')
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
        if (!player) {
            logMessage("-----------findAllBetsByPlayer--------------");
            return res
                .status(404)
                .json({ message: 'Player no found: ' + id });
        }
        const bets = await BetsUtil.findAllBetsByPlayer(player._id);
        logMessage("-----------findAllBetsByPlayer--------------");
        res.json({ bets });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const updateBet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        logMessage("-----------updateBet--------------");
        const bet = await Bets.findById(id);
        if (!bet) {
            logMessage("-----------bet--------------");
            logMessage(bet);
            return res
                .status(404)
                .json({ message: 'Player no found: ' + id });
        }

        if (data.winner) {
            bet.winner = data.winner;
            bet.status = 'complete'
        } else if (data.status === "void") {
            bet.winner = "none";
            bet.status = 'void'
        } else if (data.status === 'ongoing' && data.status === 'none') {
            bet.winner = 'none';
            bet.status = 'ongoing'
        }

        await bet.save();

        logMessage("-----------updateBet--------------");
        res.json({ message: "Bet updated." });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const BetsController = {
    createNewBet,
    findAllBets,
    findABet,
    findAllBetsByPlayer,
    updateBet
};

export default BetsController;