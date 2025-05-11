import { getAll, getOneBy, getOneById, writeOne, } from "../util/mongo.mjs";

const TABLE = "challenges";

export async function getAllChallenges() {
    return getAll(TABLE);
}

export async function getAChallenge(id) {
    return await getOneById(TABLE, id);
}

export async function getAChallengeBy(filter) {
    return await getOneBy(TABLE, filter);
}

export async function addChallenge(data) {
    return await writeOne(TABLE, data);
}