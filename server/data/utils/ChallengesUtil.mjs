import Challenges from "../../models/Challenge.mjs";
import Accounts from "../../models/Account.mjs";

const findAllValidChallenges = async () => {
    const challenges = await Challenges.find();
    let validChallenges = [];
    for (let i = 0; i < challenges.length; i++) {
        const challenge = challenges[i];
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