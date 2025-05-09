import { deleteOneById, getAll, getOneBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "bets";

export async function getAllBets() {
    return getAll(TABLE);
}

export async function getABet(id) {
    return await getOneById(TABLE, id);
}