import Bets from '../models/Bets.mjs';
import Player from '../models/Player.mjs';
import { logMessage } from '../util/logging.mjs';

const homeStats = async (req, res, next) => {
    try {
        logMessage("-----------homeStats--------------");
        const bets = await Bets.find();
        let data = [];
        for (let i = 0; i < bets.length; i++) {
            let theBet = bets[i];
            let players = theBet.teamA;
            players.push.apply(players, theBet.teamB);
            let winners;
            if (theBet.winner !== null) {
                if (theBet.winner === 'teamA') {
                    winners = theBet.teamA;
                }
                if (theBet.winner === 'teamB') {
                    winners = theBet.teamB;
                }
            }
            for (let x = 0; x < players.length; x++) {
                const playerId = players[x];
                let inside = data.find((d) => d._id.toString() === playerId.toString());

                const isWinner = winners && winners.some((w) => w.toString() === playerId.toString());
                const isVoid = theBet.status === 'void';
                const isOngoing = theBet.status === 'ongoing';
                const isComplete = theBet.status === 'complete';

                if (!inside) {
                    const player = await Player.findById(playerId).lean();

                    data.push({
                        _id: player._id,
                        display_name: player.display_name,
                        ongoing: isOngoing ? 1 : 0,
                        complete: isComplete ? 1 : 0,
                        void: isVoid ? 1 : 0,
                        wins: isWinner ? 1 : 0,
                        loss: (!isWinner || isVoid ? 1 : 0),
                        total: 1
                    });
                } else {
                    // Update existing entry in-place
                    inside.total += 1;
                    inside.ongoing += isOngoing ? 1 : 0;
                    inside.complete += isComplete ? 1 : 0;
                    inside.void += isVoid ? 1 : 0;
                    inside.wins += isWinner ? 1 : 0;
                    inside.loss += (isComplete && !isWinner) || isVoid ? 1 : 0
                }
            }
        }

        logMessage("-----------homeStats--------------");
        res.json(data);
    } catch (error) {
        next(error);
    }
}

const StatisticsController = {
    homeStats
}

export default StatisticsController;