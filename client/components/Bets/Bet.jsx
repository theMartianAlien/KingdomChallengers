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
                <ul className="flex gap-4 list-none">
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
            <div className="flex flex-wrap flex-col text-justify whitespace-pre-wrap w-[400px]">
                <p>
                    <span>Punishment: </span>
                    <br />
                    {betPunishment}
                </p>
            </div>);
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-8">
                {/* 📝 Title and Team Details */}
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
                        {bet.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 flex">
                        <span className="font-medium">
                            {bet.teamA.map((a) => a.display_name).join(", ")}
                        </span>
                        <span>
                        VS
                        </span>
                        <span className="font-medium">
                            {bet.teamB.map((b) => b.display_name).join(", ")}
                        </span>
                    </p>
                </div>
            </div>
            {/* <div className="text-3xl font-semibold">
                <p>
                    {bet.title && (<span>{bet.title}</span>)}
                </p>
                <p className="flex justify-evenly leading-tight">
                    <span>{
                        bet.teamA.map((a) => (a.display_name)).join(", ")}</span>
                    <span>&nbsp;VS&nbsp;</span>
                    <span>{
                        bet.teamB.map((b) => (b.display_name)).join(", ")}</span>
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
            <div className="flex justify-center">
                <div className="team team-a">
                    <ul className="flex gap-4 list-none">
                        {bet.teamA.map((player) => (<PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team={"team-a"} />))}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <ul className="flex gap-4 list-none">
                        {bet.teamB.map((player) => (<PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team={"team-a"} />))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-wrap flex-col text-justify whitespace-pre-wrap w-[400px]">
                {betContent}
            </div>
            {betPunishment}
            <div>
                <a href={bet.link} target="_blank" rel="noopener noreferrer">BET LINK</a>
            </div> */}
        </>
    );
}