import { Link } from "react-router-dom";
import classes from './Tag.module.css';

export default function Tag({ tag }) {
    return (
        <>
            <li key={tag} className={classes.litag}>
                <Link to={`/bet-tag/${tag}`} className={classes.tag}>
                    <span className={classes.tag}>{tag}</span>
                </Link>
            </li>
        </>
    );
}