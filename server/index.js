import express from 'express';
import cors from 'cors';
import { loadEnv } from './util/configLoader.mjs';
import { insertDiscordUsers } from './util/insert.mjs';

import discordUsersRoutes from './routes/discord-users.js';
import playersRoutes from './routes/players.js';

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

app.get('/', async (req, res) => {
    res.json('Homepage test');
});

app.get('/v1/insert', async (req, res) => {
    await insertDiscordUsers();
    res.json('Inserting records');
});

app.use('/users', discordUsersRoutes);
app.use('/players', playersRoutes);

app.listen(PORT,
    () => {
        console.log(`API listening to port ${PORT}`);
    }
);