import CounterChallenge from '../../models/CounterChallenge.mjs';

// Helper Functions
// Delete all CounterChallenges by player and challenge
const deleteAllCountersByPlayer = async (challengeId, playerId) => {
    await CounterChallenge.deleteMany({ challengeId, playerId });
};

// Get a CounterChallenge by its ID
const getCounterChallengeById = async (id) => {
    return await CounterChallenge.findById(id);
};

// Update a CounterChallenge (with simplified update)
const updateCounterChallengeInDb = async (id, counter) => {
    return await CounterChallenge.findByIdAndUpdate(id, counter, { new: true });
};

export default {
    deleteAllCountersByPlayer,
    getCounterChallengeById,
    updateCounterChallengeInDb
}