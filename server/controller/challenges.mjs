import { getAccountById } from "../data/auth.mjs";
import { addChallenge, getAChallenge, getAllChallenges, updateChallenge } from "../data/challenge.mjs";
import { getCounterChallenge, getCounterChallengeById } from "../data/counter-challenge.mjs";
import { getAPlayer } from "../data/players.mjs";
import { logMessage } from "../util/logging.mjs";
// import { resetCounterChallengesByChallengeId, updateCounterChallengeAction } from "./counter-challenge.mjs";

export async function createNewChallenge(data) {
    logMessage(data);
    const account = await getAccountById(data.issuer);
    await addChallenge(data);
}

export async function getValidChallenges() {
    const challenges = await getAllChallenges();
    let validChallenges = [];
    for (let i = 0; i < challenges.length; i++) {
        const account = await getAccountById(challenges[i].issuer);
        if (account) {
            validChallenges.push(challenges[i]);
        }
    }
    return validChallenges;
}

export async function getValidChallenge(id) {
    const challenge = await getAChallenge(id);
    if (!challenge) {
        throw new Response({ message: "Unable to find challenge with id: " + id });
    }
    let counters = await getCounterChallenge(id);
    if (counters.length > 0) {
        counters = await Promise.all(counters.map(async (counter) => {
            const player = await getAPlayer(counter.playerId);
            return {
                ...counter,
                player_name: player.display_name
            }
        }));
    }
    return { challenge, counters }
}

export async function updateValidChallenge(data) {
    const { challenge, counters } = await getValidChallenge(data._id);
    if (challenge) {
        delete data._id;
        await updateChallenge(challenge._id.toString(), {
            ...data,
            challengeType: challenge.challengeType,
            challengeEndDate: challenge.challengeEndDate
        })

        if(data.status !== 'locked') {
            //await resetCounterChallengesByChallengeId(challenge._id)
        }
    }
}