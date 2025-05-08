import { getOneBy, writeOne } from "../util/mongo.mjs";

const TABLE = "accounts";

export async function getAccount(handle) {
    return await getOneBy(TABLE, { "handle": handle });
}

export async function registerUser(data){
    return await writeOne(TABLE, data);
}