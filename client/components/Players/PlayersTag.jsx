import { Link } from "react-router-dom";
import classes from './PlayerTag.module.css';

export default function PlayerTag({ playerId, playerName, team }) {
    return (
        <>
            <li>
                <Link to={`/players/${playerId}`} className={classes[team]}>
                    <span className={classes.tag}>{playerName}</span>
                </Link>
            </li>
        </>
    );
}