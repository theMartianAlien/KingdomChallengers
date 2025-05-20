import { getAll, getOneBy, getOneById, writeOne } from "../util/mongo.mjs";

const TABLE = "discord_users";

export async function getAllDiscordUsers() {
    return await getAll(TABLE);
}

export async function getDiscordHandler(handle) {
    return await getOneBy(TABLE, { "discord_handle": handle })
}

export async function getDiscordHandlerUser(user_key, handle) {
    return await getOneBy(TABLE, { "discord_handle": handle, "user_key": user_key });
}

export async function writeADiscordHandler(data) {
    return await writeADiscordHandlerBy(TABLE, data, null);
}

export async function writeADiscordHandlerBy(data, filter) {
    return await writeOne(TABLE, data, filter);
}

export async function getDiscordUserById(id) {
    return await getOneById(TABLE,id);
}