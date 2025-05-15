import { deleteOneById, getAll, getAllBy, getOneBy, getOneById, updateOne, writeOne } from "../util/mongo.mjs";

const TABLE = "players";

export async function getAllPlayers() {
    return await getAll(TABLE);
}

export async function getAllPlayersBy(filter) {
    return await getAllBy(TABLE, filter);
}

export async function getAPlayer(id) {
    return await getOneById(TABLE, id);
}

export async function getAPlayerBy(id) {
    return await getOneById(TABLE, id);
}

export async function getAPlayerByObjectId(id) {
    return await getOneBy(TABLE, id);
}

export async function addAPlayer(data) {
    return await addAPlayerBy(TABLE, data);
}

export async function addAPlayerBy(data, filter) {
    return await writeOne(TABLE, data, filter);
}

export async function getAPlayerByDiscordHandle(discord_handle) {
    return await getOneBy(TABLE, {"discord_handle": discord_handle});
}

export async function getAPlayerByHandler(id) {
    return await getOneBy(TABLE, {"discord_handler_id": id});
}

export async function replaceAPlayer(data){
    const id = data._id;
    if(data._id){
        delete data._id;
    }
    return await updateOne(TABLE, id, data);
}

export async function removeAPlayer(id){
    return await deleteOneById(TABLE, id);
}