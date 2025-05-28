import Challenges from "../../models/Challenge.mjs";
import Accounts from "../../models/Account.mjs";
import { IsExpired } from "../../util/date.mjs";

const findAllValidChallenges = async () => {
    const challenges = await Challenges.find();
    let validChallenges = [];
    for (let i = 0; i < challenges.length; i++) {
        const challenge = challenges[i];

        if (challenge.status === 'ready' && IsExpired(challenge.challengeEndDate)) {
            challenge.status = 'expired';
            await challenge.save(); continue;
        }

        const account = await Accounts.findById(challenge.issuer);
        if (account) {
            validChallenges.push(challenge);

        } 
    }
    return validChallenges;
}

export default {
    findAllValidChallenges
}