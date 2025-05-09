import classes from './Bet.module.css';
import PlayerTag from '../Players/PlayersTag';
import Tag from '../Tag';
import { cleanText } from '../../util/text';

export default function Bet({ bet }) {
    let betContent = cleanText(bet.text, []);
    let status;
    if (bet.status === 'ongoing') {
        status = "On Going";
    } else if (bet.status === 'void') {
        status = "Void";
    } else if (bet.status === 'complete') {
        status = "Completed";
    }

    let tags;
    if (bet.tags && bet.tags.length > 0) {
        tags = (
            <div>
                <ul className={classes.list}>
                    {bet.tags.map((tag) => (
                        <Tag tag={tag} key={tag} />
                    ))}
                </ul>
            </div>
        );
    }

    let betPunishment = cleanText(bet.punishment, []);
    if (betPunishment) {
        betPunishment = (
            <div className={classes.content}>
                <p>
                    <span>Punishment: </span>
                    <br />
                    {betPunishment}
                </p>
            </div>);
    }

    return (
        <>
            <div className={classes.betTitle}>
                <p className={classes["team-versus"]}>
                    <span>{
                        bet.teamA.map((a) => (a.display_name)).join(", ")}</span>
                    <span>&nbsp;VS&nbsp;</span>
                    <span>{
                        bet.teamB.map((b) => (b.display_name)).join(", ")}</span>
                </p>
                <p>
                    {bet.title && (<span>{bet.title}</span>)}
                </p>
            </div>
            <div className='status'>
                <p>Bet status: <span>{status}</span></p>
                {bet.status === 'complete' ?
                    (<p>Date Completed: <span>{bet.status}</span>
                        <span>{bet.winner}</span></p>) : undefined
                }
                <p>
                    {bet.status === 'complete' ? (<span>{bet.winner}</span>) : undefined}
                </p>
            </div>
            {tags && tags}
            <div className={classes.team}>
                <div className="team team-a">
                    <ul className={classes.list}>
                        {bet.teamA.map((player) => (<PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team={"team-a"} />))}
                    </ul>
                </div>
                <div className="team team-b">
                    <ul className={classes.list}>
                        {bet.teamB.map((player) => (<PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team={"team-a"} />))}
                    </ul>
                </div>
            </div>
            <div className={classes.content}>
                {betContent}
            </div>
            {betPunishment}
            <div>
                <a href={bet.link} target="_blank" rel="noopener noreferrer">BET LINK</a>
            </div>
        </>
    );
}