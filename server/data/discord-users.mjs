import { getAll, getOneBy } from "../util/mongo.mjs";

const TABLE = "discord_users";

export async function getAllDiscordUsers() {
    return await getAll(TABLE);
}

export async function getDiscordHandler(handle) {
    return await getOneBy(TABLE, { "discord_handle": handle })
}