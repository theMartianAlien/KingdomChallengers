import express from 'express';
import cors from 'cors';
import { loadEnv } from './util/configLoader.mjs';

import discordUsersRoutes from './routes/discord-users.js';
import playersRoutes from './routes/players.js';
import betsRoutes from './routes/bets.js';
import authRoutes from './routes/auth.js';
import challengesRoutes from './routes/challenges.js';
import counterChallengeRoutes from './routes/counter-challenge.js';
import homepageRoutes from './routes/stats.js';
import testDataRoutes from './routes/data-inserts.js'

loadEnv();

const PORT = process.env.PORT || 3000;
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

app.use(homepageRoutes);
app.use('/v1/data', testDataRoutes);
app.use('/auth', authRoutes);
app.use('/bets', betsRoutes);
app.use('/discord', discordUsersRoutes);
app.use('/players', playersRoutes);
app.use('/challenges', challengesRoutes);
app.use('/counter-challenge', counterChallengeRoutes);

app.listen(PORT,
    () => {
        console.log(`API listening to port ${PORT}`);
    }
);