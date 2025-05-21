import { addChallenge } from "../data/challenge.mjs";
import { logMessage } from "../util/logging.mjs";

export async function createNewChallenge(data) {
    logMessage(data);
    await addChallenge(data);
}

function getChallengeForUI() {

}