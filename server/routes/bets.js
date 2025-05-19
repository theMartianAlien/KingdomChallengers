import express from 'express';
import { getABet, getAllBets, getAllBetsByPlayer } from '../data/bets.mjs';
import { getAllPlayers, getAllPlayersBy } from '../data/players.mjs';
import { isAdminAuthenticate } from '../util/auth.mjs';
import { logMessage } from '../util/logging.mjs';
// import logMessage from '../util/logging.mjs';
// import { logMessage } from '../util/logging.mjs';
const router = express();

router.get('/', async (req, res, next) => {
    try {
        logMessage("getAllBets called");
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
        logMessage("getABet called");
        const id = req.params.id;
        const bet = await getABet(id);
        const teamA = await getAllPlayersBy({ _id: { $in: bet.teamA.map((a) => a.player_id) } });
        const teamB = await getAllPlayersBy({ _id: { $in: bet.teamB.map((a) => a.player_id) } });
        const betData = {
            ...bet,
            teamA: teamA.map((a) => { return { _id: a._id.toString(), display_name: a.display_name } }),
            teamB: teamB.map((b) => { return { _id: b._id.toString(), display_name: b.display_name } }),
        }
        const players = await getAllPlayers();
        res.json({ bet: betData, players });
    } catch (error) {
        next(error);
    }
});

router.use(isAdminAuthenticate);

router.get('/player/:id', async (req, res, next) => {
    try {
        logMessage("getABet called");
        const id = req.params.id;
        const bets = await getAllBetsByPlayer(id);
        res.json({ bets });
    } catch (error) {
        next(error);
    }
});

export default router;