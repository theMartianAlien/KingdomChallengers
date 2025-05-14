import { Link } from "react-router-dom";
import classes from './PlayerTag.module.css';

export default function PlayerTag({ playerId, playerName, team, isWinner, isVoid }) {

    let winner = '';
    if (isVoid) {
        winner = ' ' + classes.void
    } else {
        if (isWinner && isWinner === team) {
            winner = ' ' + classes.winner
        } else if (isWinner) {
            winner = ' ' + classes.loser
        }
    }

    return (
        <>
            <li>
                <Link to={`/players/${playerId}`} className={classes[team] + winner}>
                    <span className={classes.tag + winner}>{playerName}</span>
                </Link>
            </li>
        </>
    );
}