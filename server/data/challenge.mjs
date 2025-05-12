import { getAll, getOneBy, getOneById, writeOne, } from "../util/mongo.mjs";
import { getAccountById } from "./auth.mjs";
import { getAPlayer } from "./players.mjs";

const TABLE = "challenges";

export async function getAllChallenges() {
    const challenges = await getAll(TABLE);
    const newChallenges = await Promise.all(challenges.map(async (challenge) => {
        const aPlayer = await getAccountById(challenge.issuer);
        const challenger = await getAPlayer(aPlayer.player_id);
        return {
            ...challenge,
            challenger: challenger.display_name
        }
    }));
    return newChallenges;
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