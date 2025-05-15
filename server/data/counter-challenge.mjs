import { ObjectId } from "mongodb";
import { getAllBy, writeOne } from "../util/mongo.mjs";

const TABLE = "counter-challenge";

export async function addCounterChallenge(data) {
    return await writeOne(TABLE, data);
}

export async function getCounterChallenge(id) {
    return await getAllBy(TABLE, { "challengeId": id })
}