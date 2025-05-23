import { getOneBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "accounts";

export async function getAccount(handle) {
    return await getOneBy(TABLE, { "discord_handle": handle });
}

export async function getAccountByUserName(username) {
    return await getOneBy(TABLE, { "username": username });
}

export async function registerUser(data) {
    return await writeOne(TABLE, data);
}

export async function getUserAccount(username, password) {
    return await getOneBy(TABLE, { "username": username, "password": password });
}

export async function getAccountById(id) {
    return await getOneById(TABLE, id);
}

export async function getAccountByPlayerId(id) {
    return await getOneById(TABLE, id);
}

export async function replaceImage(id, data) {
    return await updateOne(TABLE, id, data);
}

export async function updateAccount(id, data) {
    return await updateOne(TABLE, id, data);
}

export async function getAccountByDiscordId(id) {
    return await getOneBy(TABLE, { "discord_id": id })
}

export async function getAccountByDiscordHandle(handle) {
    return await getOneBy(TABLE, { "discord_handle": handle });
}

export async function getAccountByDiscorHandleId(id) {
    return await getOneBy(TABLE, { "discord_handle_id": id })
}

export async function getAccountByDiscorHandleIdPlayerId(discord_handle_id, player_id) {
    return await getOneBy(TABLE, { "discord_handle_id": discord_handle_id, "player_id": player_id });
}