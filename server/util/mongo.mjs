import { MongoClient, ObjectId } from "mongodb";
import { loadEnv } from "./configLoader.mjs";
import { error } from 'node:console';
import { logMessage } from "./logging.mjs";

loadEnv();

const URI = process.env.MONGO_URI;
const DATABASE = process.env.MONGO_DATABASE;
const client = new MongoClient(URI);
const database = client.db(DATABASE);

export async function writeOne(file, data, filter) {
    try {
        if (!file)
            throw error(`Invalid collection name (${file})`);

        const collection = database.collection(file);
        client.connect();
        logMessage("Connected to mongo atlast, writeOneRecord " + file);
        if (filter) {
            const exist = await collection.findOne(filter);
            if (exist) {
                // record exist so we go out and not try to insert.
                return null;
            }
        }
        // return 1, number of records we added.
        return await collection.insertOne(data);
    }
    catch (error) {
        logMessage(error);
    }
}

export async function getAll(file) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, getAll " + file);
    const data = await collection.find().toArray();
    return data;
}

export async function getAllBy(file, filter) {
    if (!file)
        throw error(`Invalid collection name (${file})`);
    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, getAllBy " + file);
    const data = await collection.find(filter).toArray();
    return data;
}

export async function getOneById(file, id) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, getOneById " + file);
    const data = await collection.findOne({ _id: new ObjectId(id) })
    return data;
}

export async function getOneBy(file, filter) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, getOneBy " + file);
    const data = await collection.findOne(filter)
    return data;
}

export async function updateOne(file, id, data) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, updateOne " + file);
    await collection.replaceOne({ _id: new ObjectId(id) }, data);
}

export async function deleteOneById(file, id) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, deleteOneById " + file);
    await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function deleteOneBy(file, filter){
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    logMessage("Connected to mongo atlast, getOneBy " + file);
    const data = await collection.deleteOne(filter)
    return data;
}