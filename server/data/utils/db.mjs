import mongoose from 'mongoose';
import { MongoClient } from "mongodb";
import { loadEnv } from '../../util/configLoader.mjs';

loadEnv();

const ATLAS = process.env.MONGO_ATLAS;
const URI = process.env.MONGO_URI;
const DATABASE = process.env.MONGO_DATABASE;

const client = new MongoClient(URI);
const database = client.db(DATABASE);

export const connectDB = async () => {
    try {
        // Mongoose connection
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: DATABASE, // Optional: Set the DB name explicitly
        });

        // MongoClient connection (if you need native access too)
        await client.connect();

        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        // console.error('❌ MongoDB Atlas connection error:', err.message);
        process.exit(1);
    }
};

export { database };