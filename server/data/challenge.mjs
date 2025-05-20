import {logMessage} from "../util/logging.mjs";
import { getAll, getOneBy, getOneById, updateOne, writeOne, } from "../util/mongo.mjs";
import { getAccountById } from "./auth.mjs";
import { getAPlayerByObjectId } from "./players.mjs";

const TABLE = "challenges";

export async function getAllChallenges() {
    const challenges = await getAll(TABLE);
    const newChallenges = await Promise.all(challenges.map(async (challenge) => {
        const account = await getAccountById(challenge.issuer);
        if(!account) {
            logMessage("The account");
            logMessage(account);
            logMessage(challenge);
        }
        const player = await getAPlayerByObjectId(account.player_id);
        if(!player) {
            logMessage("The player");
            logMessage(player);
            logMessage(challenge);
        }
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
    const player = await getAPlayerByObjectId(acc.player_id);
    return { ...challenge, challenger: player.display_name };
}

export async function getAChallengeBy(filter) {
    return await getOneBy(TABLE, filter);
}

export async function addChallenge(data) {
    return await writeOne(TABLE, data);
}

export async function updateChallenge(data){
    const id = data._id;
    delete data._id;
    return await updateOne(TABLE, id, data);
}