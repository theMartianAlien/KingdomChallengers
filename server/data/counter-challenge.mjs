import { deleteOneById, getAllBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "counter-challenge";

export async function addCounterChallenge(data) {
    return await writeOne(TABLE, data);
}

export async function getCounterChallenge(id) {
    return await getAllBy(TABLE, { "challengeId": id })
}

export async function getCounterChallengeById(id) {
    return await getOneById(TABLE, id);
}

export async function updateCounterChallenge(id, data) {
    return await updateOne(TABLE, id, data);
}

export async function deleteCounterChallenge(id) {
    return await deleteOneById(TABLE, id);
}