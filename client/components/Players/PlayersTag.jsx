import { Link } from "react-router-dom";
import classes from './PlayerTag.module.css';

export default function PlayerTag({ playerId, playerName, team, isWinner, isVoid }) {
    let winner = '';
    if (isVoid) {
        winner = ' ' + classes.void
    } else if (isWinner !== 'none') {
        if (isWinner && isWinner === team) {
            winner = ' ' + classes.winner
        } else if (isWinner) {
            winner = ' ' + classes.loser
        }
    }

    return (
        <>
            <li key={playerId}>
                <Link to={`/players/${playerId}`} className={classes[team] + winner}>
                    <span className={classes.tag + winner}>{playerName}</span>
                </Link>
            </li>
        </>
    );
}