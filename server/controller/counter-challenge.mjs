import Challenge from '../models/Challenge.mjs';
import CounterChallenge from '../models/CounterChallenge.mjs';
import Player from '../models/Player.mjs';
import CounterChallengeUtil from '../data/utils/CounterChallengeUtil.mjs';
import { logError, logMessage } from "../util/logging.mjs";

const createCounterChallenge = async (req, res, next) => {
    try {
        logMessage("createCounterChallenge called");
        const challege = await Challenge.findById(req.body.challengeId);
        const player = await Player.findById(req.body.playerId);

        if (!challege || !player) {
            return res.status(404).json({ message: 'Unable to add counter challenge.' });
        }

        await CounterChallengeUtil.deleteAllCountersByPlayer(challege._id, req.body.playerId)

        // Create the new Counter Challenge
        const newCounterChallenge = new CounterChallenge({
            challengeId: challege._id,
            challenge: req.body.challenge,
            punishment: req.body.punishment,
            team: req.body.team,
            playerId: req.body.playerId,
            action: req.body.action
        });

        await newCounterChallenge.save();

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
        // Find the CounterChallenge by its ID
        const counterChallenge = await CounterChallenge.findById(req.params._id);

        if (!counterChallenge) {
            return res.status(404).json({ message: 'Counter Challenge not found' });
        }

        // Update the action field of the Counter Challenge
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
        logMessage("deleteCounterChallenge called");
        // Delete the Counter Challenge by its ID
        const result = await CounterChallenge.findByIdAndDelete(req.params._id);

        if (!result) {
            return res.status(404).json({ message: 'Counter Challenge not found' });
        }

        res.status(200).json({ message: 'Counter Challenge deleted!' });
    } catch (error) {
        logError(error);
        next(error);
    }
};

export default {
    createCounterChallenge,
    updateCounterChallenge,
    deleteCounterChallenge
};