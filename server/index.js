import express from 'express';
import cors from 'cors';
import { loadEnv } from './util/configLoader.mjs';

loadEnv();

const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/', async (req, res) => {
    res.json('Homepage test');
});

app.listen(PORT,
    () => {
        console.log(`API listening to port ${PORT}`);
    }
);