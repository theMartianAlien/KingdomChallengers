import express from 'express';
import { getABet, getAllBets } from '../data/bets.mjs';
import { getAllPlayersBy } from '../data/players.mjs';
import { ObjectId } from 'mongodb';

const router = express();

router.get('/', async (req, res, next) => {
    try {
        console.log("getAllBets called");
        const bets = await getAllBets();

        if (!bets || bets.length === 0) {
            res.json("No bets currently in the database.");
            return;
        }
        res.json(bets);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        console.log("getABet called");
        const id = req.params.id;
        const bet = await getABet(id);
        const teamA = await getAllPlayersBy({ _id: { $in: bet.teamA.map((a) => new ObjectId(a)) } });
        const teamB = await getAllPlayersBy({ _id: { $in: bet.teamB.map((a) => new ObjectId(a)) } });
        const betData = {
            ...bet,
            teamA: teamA.map((a) => { return { _id: a._id.toString(), display_name: a.display_name } }),
            teamB: teamB.map((b) => { return { _id: b._id.toString(), display_name: b.display_name } }),
        }
        res.json({ bet: betData });
    } catch (error) {
        next(error);
    }
});

export default router;