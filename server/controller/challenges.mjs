import { logError, logMessage } from "../util/logging.mjs";
import ChallengesUtil from "../data/utils/ChallengesUtil.mjs";
import Challenge from "../models/Challenge.mjs";
import Account from "../models/Account.mjs";
import PlayersUtil from "../data/utils/PlayersUtil.mjs";
import CounterChallengeUtil from "../data/utils/CounterChallengeUtil.mjs";
import CounterChallenge from "../models/CounterChallenge.mjs";

const findChallenge = async (req, res, next) => {
    try {
        logMessage("-----------findChallenge--------------");
        const id = req.params.id;
        const challenge = await Challenge
            .findById(id)
            .populate({
                path: 'counters',
                populate: {
                    path: 'playerId',
                    model: 'Player',
                }
            }).exec();

        if (!challenge || challenge?.status === 'expired') {
            logMessage("-----------challenge--------------");
            logMessage(challenge);
            return res.status(404).json({ message: 'Error finding challenge: ' + req.params.id });
        }

        logMessage("-----------findChallenge--------------");
        return res.json({ challenge });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findAllChallenge = async (req, res, next) => {
    try {
        logMessage("-----------findAllChallenge--------------");
        const challenges = await ChallengesUtil.findAllValidChallenges();
        if (!challenges) {
            logMessage("-----------challenges--------------");
            logMessage(challenges);
            return res.status(404).json({ message: 'Challenges table is empty!' });
        }
        
        logMessage("-----------findAllChallenge--------------");
        res.json({ challenges });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const createNewChallenge = async (req, res, next) => {
    try {
        logMessage("-----------createNewChallenge--------------");
        const account = await Account.findById(req.body.issuer);
        if (!account) {
            logMessage("-----------account--------------");
            logMessage(account);
            return res.status(404).json({ message: 'Unable to add challenge.' });
        }

        const newCounterChallenge = new Challenge({
            issuer: account._id,
            status: 'ready',
            title: req.body.title,
            statement: req.body.statement,
            loserPunishment: req.body.loserPunishment,
            challengeType: req.body.challengeType,
            challengeEndDate: req.body.challengeEndDate,
            participants: req.body.participants
        });

        await newCounterChallenge.save();
        logMessage("-----------createNewChallenge--------------");
        res.status(201).json({ message: 'Challenge issued' });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const lockChallenge = async (req, res, next) => {
    try {
        logMessage("-----------lockChallenge--------------");

        const challenge = await Challenge.findById(req.params.id).populate('counters').exec();

        if (!challenge) {
            logMessage("-----------challenge--------------");
            logMessage(challenge);
            return res.status(404).json({ message: 'Error updating challenge :' + req.params.id });
        }

        challenge.status = 'locked';
        challenge.counters = challenge.counters.filter(x=>x.action === 'accept');
        // I removed counters not accepted.
        for (const counter of challenge.counters) {
            await CounterChallengeUtil.lockCounterChallengeAction(counter);
        }

        await challenge.save();
        logMessage("-----------lockChallenge--------------");
        res.status(201).json({ message: "Challenge updated" });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const updateChallenge = async (req, res, next) => {
    try {
        logMessage("-----------updateChallenge--------------");

        const challenge = await Challenge.findById(req.params.id).populate('counters').exec();
        const account = await Account.findById(req.body.issuer);

        if (!account || !challenge) {
            logMessage("-----------challenge--------------");
            logMessage(challenge);
            logMessage("-----------account--------------");
            logMessage(account);
            return res.status(404).json({ message: 'Error updating challenge :' + req.params.id });
        }

        challenge.issuer = account._id;
        challenge.status = req.body.status;
        challenge.title = req.body.title;
        challenge.statement = req.body.statement;
        challenge.loserPunishment = req.body.loserPunishment;
        challenge.challengeType = req.body.challengeType;
        challenge.challengeEndDate = req.body.challengeEndDate;

        const validPlayers = await PlayersUtil.findAllPlayersForChallenge(req.body.participants);
        if (challenge.challengeType === 'close' && validPlayers.length <= 0) {
            logMessage("-----------validPlayers--------------");
            logMessage(validPlayers);
            logMessage("-----------challenge.challengeType--------------");
            logMessage(challenge.challengeType);
            return res.status(422).json({ message: 'Error updating challenge :' + req.params._id });
        }

        challenge.participants = validPlayers;
        for (const counter of challenge.counters) {
            await CounterChallengeUtil.resetCounterChallengeAction(counter);
        }

        await challenge.save();
        logMessage("-----------updateChallenge--------------");
        res.status(201).json({ message: "Challenge updated" });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const deleteChallenge = async (req, res, next) => {
    try {
        logMessage("-----------deleteChallenge--------------");
        const challengeId = req.params.id;
        const result = await Challenge.findByIdAndDelete(challengeId);

        if (!result) {
            logMessage("-----------result--------------");
            logMessage(result);
            return res.status(404).json({ message: 'Unable to delete challenge:' + challengeId });
        }

        await CounterChallenge.updateMany(
            { challengeId: challengeId },
            { $pull: { challengeId: challengeId } }
        );

        logMessage("-----------deleteChallenge--------------");
        res.status(201).json({ message: "Challenge deleted" });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const ChallengesController = {
    findChallenge,
    findAllChallenge,
    createNewChallenge,
    lockChallenge,
    updateChallenge,
    deleteChallenge
};

export default ChallengesController;