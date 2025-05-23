import CounterChallenge from '../../models/CounterChallenge.mjs';

const deleteAllCountersByPlayer = async (challengeId, playerId) => {
    await CounterChallenge.deleteMany({ challengeId, playerId });
};

const getCounterChallengeById = async (id) => {
    return await CounterChallenge.findById(id);
};

const updateCounterChallengeInDb = async (id, counter) => {
    return await CounterChallenge.findByIdAndUpdate(id, counter, { new: true });
};

const resetCounterChallengeAction = async (counter) => {
    counter.action = 'none';
    await counter.save();;
}

const lockCounterChallengeAction = async (counter) => {
    counter.action = 'locked';
    await counter.save();;
}

const CounterChallengeUtil = {
    deleteAllCountersByPlayer,
    getCounterChallengeById,
    lockCounterChallengeAction,
    updateCounterChallengeInDb,
    resetCounterChallengeAction
}

export default CounterChallengeUtil;