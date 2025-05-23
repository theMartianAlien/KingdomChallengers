import { logError, logMessage } from "../util/logging.mjs";
import CounterChallenge from '../models/CounterChallenge.mjs';
import CounterChallengeUtil from '../data/utils/CounterChallengeUtil.mjs';
import Player from '../models/Player.mjs';
import Challenge from '../models/Challenge.mjs';

const createCounterChallenge = async (req, res, next) => {
    try {
        logMessage("-----------createCounterChallenge--------------");
        const challenge = await Challenge.findById(req.body.challengeId);
        const player = await Player.findById(req.body.playerId);

        if (!challenge || !player) {
            logMessage("-----------challenge--------------");
            logMessage(challenge);
            logMessage("-----------player--------------");
            logMessage(player);
            return res.status(404).json({ message: 'Unable to add counter challenge.' });
        }
        await CounterChallengeUtil.deleteAllCountersByPlayer(challenge._id, req.body.playerId)

        // Create the new Counter Challenge
        const newCounterChallenge = new CounterChallenge({
            challengeId: challenge._id,
            challenge: req.body.challenge,
            punishment: req.body.punishment,
            team: req.body.team,
            playerId: req.body.playerId,
            action: "none"
        });

        await newCounterChallenge.save();

        await Challenge.findByIdAndUpdate(
            challenge._id,
            { $push: { counters: newCounterChallenge._id } },
            { new: true }
        );

        logMessage("-----------createCounterChallenge--------------");
        res.status(201).json({ message: 'Counter Challenge issued!' });
    }
    catch (error) {
        logError(error);
        next(error);
    }
};

const updateCounterChallenge = async (req, res, next) => {
    try {
        logMessage("updateCounterChallenge called");
        const counterChallenge = await CounterChallenge.findById(req.params.id);

        const challenge = await Challenge.findById(req.body.challegeId);

        const player = await Player.findById(req.body.playerId);
        if (!counterChallenge || !player || !challenge) {
            logMessage("-----------updateCounterChallenge--------------");
            logMessage("-----------counterChallenge--------------");
            logMessage(counterChallenge);
            logMessage("-----------challenge--------------");
            logMessage(challenge);
            logMessage("-----------player--------------");
            logMessage(player);
            logMessage("-----------updateCounterChallenge--------------");
            return res.status(404).json({ message: 'Error updating counter challenge :' + req.params.id });
        }

        counterChallenge.challegeId = req.body.challenge._id;
        counterChallenge.challege = req.body.challege;
        counterChallenge.punishment = req.body.punishment;
        counterChallenge.team = req.body.team;
        counterChallenge.team = req.body.team;
        counterChallenge.playerId = player._id;
        counterChallenge.action = req.body.action;

        // Save the updated Counter Challenge
        await counterChallenge.save();
        res.status(201).json({ message: 'Counter Challenge updated!' });
    }
    catch (error) {
        logError(error);
        next(error);
    }
};

const deleteCounterChallenge = async (req, res, next) => {
    try {
        logMessage("-----------deleteCounterChallenge--------------");
        const result = await CounterChallenge.findByIdAndDelete(req.params._id);

        if (!result) {
            logMessage("-----------result--------------");
            logMessage(result);
            return res.status(404).json({ message: 'Counter Challenge not found' });
        }

        logMessage("-----------deleteCounterChallenge--------------");
        res.status(200).json({ message: 'Counter Challenge deleted!' });
    } catch (error) {
        logError(error);
        next(error);
    }
};

const CounterChallengeController = {
    createCounterChallenge,
    updateCounterChallenge,
    deleteCounterChallenge
};

export default CounterChallengeController;