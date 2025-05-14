import { getAllBets } from "./bets.mjs";
import { getAPlayer } from "./players.mjs";

export async function getStatistics() {
    let data = [];
    const bets = await getAllBets();
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
            let inside = data.find((d) => d.id === players[x]);

            if (!inside) {
                const playerName = await getAPlayer(players[x]);
                data.push(
                    {
                        id: players[x],
                        display_name: playerName.display_name,
                        ongoing: (theBet.status === 'ongoing' ? 1 : 0),
                        complete: (theBet.status === 'complete' ? 1 : 0),
                        void: (theBet.status === 'void' ? 1 : 0),
                        wins: (winners && winners.find((w) => w === players[x]) ? 1 : 0),
                        loss: (winners && !winners.find((w) => w === players[x]) ? 1 : 0) + (theBet.status === 'void' ? 1 : 0),
                        total: 1,
                    }
                );
            } else {
                data.map((obj) => {
                    if (obj.id === players[x]) {
                        obj.total = obj.total + 1;
                        obj.ongoing = (obj.ongoing + (theBet.status === 'ongoing' ? 1 : 0));
                        obj.complete = (obj.complete + (theBet.status === 'complete' ? 1 : 0));
                        obj.void = (obj.void + (theBet.status === 'void' ? 1 : 0));
                        obj.wins = (obj.wins + (winners && winners.find((w) => w === players[x]) ? 1 : 0));
                        obj.loss = (obj.loss + (winners && !winners.find((w) => w === players[x]) ? 1 : 0) + (theBet.status === 'void' ? 1 : 0));
                        return {
                            ...obj,
                        }
                    }
                });
            }
        }
    }
    return data;
}