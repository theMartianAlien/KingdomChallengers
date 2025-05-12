import { getAll, getOneBy, getOneById, writeOne, } from "../util/mongo.mjs";
import { getAccountById } from "./auth.mjs";
import { getAPlayer, getAPlayerByHandler } from "./players.mjs";

const TABLE = "challenges";

export async function getAllChallenges() {
    return await getAll(TABLE);
}

export async function getAChallenge(id) {
    const challenge = await getOneById(TABLE, id);
    const acc = await getAccountById(challenge.issuer);
    const challenger = await getAPlayer(acc.player_id);
    return { ...challenge, challenger: challenger.display_name };
}

export async function getAChallengeBy(filter) {
    return await getOneBy(TABLE, filter);
}

export async function addChallenge(data) {
    return await writeOne(TABLE, data);
}