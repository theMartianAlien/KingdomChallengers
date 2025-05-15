import { ObjectId } from "mongodb";
import { deleteOneById, getAll, getAllBy, getOneBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "bets";

export async function getAllBets() {
    return getAll(TABLE);
}

export async function getABet(id) {
    return await getOneById(TABLE, id);
}

export async function addABet(data) {
    return await addABetBy(TABLE, data);
}

export async function addABetBy(data, filter) {
    return await writeOne(TABLE, data, filter);
}
export async function getAllBetsByPlayer(id) {
    let bets = await getAllBy(TABLE, { "teamA.player_id": new ObjectId(id) });
    let betsB = await getAllBy(TABLE, { "teamB.player_id": new ObjectId(id) });
    bets.push.apply(bets, betsB);
    return bets;
}