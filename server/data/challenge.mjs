import { getAll, getOneBy, getOneById, writeOne, } from "../util/mongo.mjs";
import { getAccountById } from "./auth.mjs";
import { getAPlayer, getAPlayerByHandler } from "./players.mjs";

const TABLE = "challenges";

export async function getAllChallenges() {
    const challenges = await getAll(TABLE);
    const newChallenges = await Promise.all(challenges.map(async (challenge) => {
        const account = await getAccountById(challenge.issuer);
        const player = await getAPlayerByHandler(account.player_id);
        return {
            ...challenge,
            challenger: player.display_name
        }
    }));
    return newChallenges;
}

export async function getAChallenge(id) {
    const challenge = await getOneById(TABLE, id);
    const acc = await getAccountById(challenge.issuer);
    const player = await getAPlayerByHandler(acc.player_id);
    return { ...challenge, challenger: player.display_name };
}

export async function getAChallengeBy(filter) {
    return await getOneBy(TABLE, filter);
}

export async function addChallenge(data) {
    return await writeOne(TABLE, data);
}