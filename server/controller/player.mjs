import { getAllBetsByPlayer } from "../data/bets.mjs";

export async function getBetsByPlayer(id){
    const bets = await getAllBetsByPlayer(id);
    return bets;
}