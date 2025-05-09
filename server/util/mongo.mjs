import { MongoClient, ObjectId } from "mongodb";
import { loadEnv } from "./configLoader.mjs";
import { error } from 'node:console';

loadEnv();

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);
const database = client.db('kingdom-challenge');

export async function writeOne(file, data, filter) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, writeOneRecord " + file);
    if (filter) {
        const exist = await collection.findOne(filter);
        if (exist) {
            // record exist so we go out and not try to insert.
            return null;
        }
    }
    await collection.insertOne(data);
    // retrun 1, number of records we added.
    return 1;
}

export async function getAll(file) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, getAll " + file);
    const data = await collection.find().toArray();
    return data;
}

export async function getAllBy(file, filter) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, getAllBy " + file);
    const data = await collection.find(filter).toArray();
    return data;
}

export async function getOneById(file, id) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, getOneById " + file);
    const data = await collection.findOne({ _id: new ObjectId(id) })
    return data;
}

export async function getOneBy(file, filter) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, getOneBy " + file);
    const data = await collection.findOne(filter)
    return data;
}

export async function updateOne(file, data) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, updateOne " + file);
    await collection.replaceOne({ _id: data._id }, data);
}

export async function deleteOneById(file, id) {
    if (!file)
        throw error(`Invalid collection name (${file})`);

    const collection = database.collection(file);
    client.connect();
    console.log("Connected to mongo atlast, deleteOneById " + file);
    await collection.deleteOne({ _id: new ObjectId(id) });
}