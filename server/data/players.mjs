import { ObjectId } from "mongodb";
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

export async function addAPlayer(data) {
    return await writeOne(TABLE, data);
}

export async function getAPlayerByDiscordHandle(handle) {
    return await getOneBy(TABLE, {"handler": handle});
}

export async function getAPlayerByHandler(id) {
    return await getOneBy(TABLE, {"discord_handler_id": new ObjectId(id)});
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