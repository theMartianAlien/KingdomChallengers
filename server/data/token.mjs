import { getOneBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "tokens";

export async function storeTokenForAccount(data) {
    return await writeOne(TABLE, data);
}

export async function getTokenForAccount(accountId) {
    return await getOneBy(TABLE, { "accountId": accountId });
}

export async function replaceTokenForAccount(id, data) {
    return await updateOne(TABLE, id, data);
}