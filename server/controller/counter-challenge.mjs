import { deleteCounterChallenge } from "../data/counter-challenge.mjs";

export async function deleteCounterChallengeById(id){
    return await deleteCounterChallenge(id);
}