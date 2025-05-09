import express from 'express';
import { getAllBets } from '../data/bets.mjs';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        console.log("getAllBets called");
        const bets = await getAllBets();

        if (!bets || bets.length === 0) {
            res.json("No bets currently in the database.");
            return;
        }
        // const newPlayers = players.map((player) => ({
        //     _id: player._id,
        //     handler: player.handler,
        //     display_name: player.display_name
        // }));
        res.json(bets);
    } catch (error) {
        next(error);
    }
});

export default router;