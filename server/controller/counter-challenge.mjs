import { deleteAllCountersByPlayer, deleteCounterChallenge, findAllCounters } from "../data/counter-challenge.mjs";
import { addCounterChallenge as writeCounterChallenge } from "../data/counter-challenge.mjs";

export async function deleteCounterChallengeById(id){
    return await deleteCounterChallenge(id);
}

export async function addCounterChallenge(data) {
    // delete what you have initially
    await deleteAllCountersByPlayer(data.challengeId, data.playerId)
    await writeCounterChallenge(data);
}