import { deleteAllCountersByPlayer, deleteCounterChallenge, findAllCounters, getCounterChallengeById } from "../data/counter-challenge.mjs";
import { addCounterChallenge as writeCounterChallenge, updateCounterChallenge } from "../data/counter-challenge.mjs";
import { logMessage } from "../util/logging.mjs";

export async function deleteCounterChallengeById(id) {
    return await deleteCounterChallenge(id);
}

export async function addCounterChallenge(data) {
    // delete what you have initially
    await deleteAllCountersByPlayer(data.challengeId, data.playerId)
    await writeCounterChallenge(data);
}

export async function updateCounterChallengeAction(data) {
    let counter = await getCounterChallengeById(data._id);
    const _id = counter._id;
    delete counter._id;
    counter = {
        ...counter,
        action: data.action
    }
    await updateCounterChallenge(_id, counter);
}

export async function resetCounterChallengesByChallengeId(id) {
    const counters = await getCounterChallengeById(id);
    for (let i = 0; i < counters.length; i++) {
        if (counters[i]?.action === 'accept') {
            delete counters[i].action;
            const updatedCounter = {
                ...counters[i]
            }
            await updateCounterChallengeAction(updatedCounter);
        }
    }
}