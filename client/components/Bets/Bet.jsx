import PlayerTag from '../Players/PlayersTag';
import Tag from '../UI/Tag';
import { cleanText, getStatus, replaceTextWithJSX, tokenizeText } from '../../util/text.jsx';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa'
import NavigateButton from '../UI/Buttons/NavigateButton';

export default function Bet() {
    const { adminToken } = useRouteLoaderData('root');
    const { bet } = useRouteLoaderData('bet-detail');
    const playersOnBet = [...bet.teamA, ...bet.teamB];
    const tokens = tokenizeText(bet?.text);
    let betContent = replaceTextWithJSX(tokens, playersOnBet)

    let status = getStatus(bet?.status);

    let tags;
    if (bet?.tags && bet?.tags.length > 0) {
        tags = (
            <div>
                <ul className="flex gap-4 list-none">
                    {bet?.tags.map((tag) => (
                        <Tag tag={tag} key={tag} />
                    ))}
                </ul>
            </div>
        );
    }

    const newToken = tokenizeText(bet?.punishment);
    let betPunishment = replaceTextWithJSX(newToken, playersOnBet)

    return (
        <>
            <div className="max-w-4xl mx-auto p-5 lg:p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-8 my-10">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
                        {bet?.title}
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 text-center font-medium">
                        {bet?.teamA.map(a => a.display_name).join(", ")}&nbsp;
                        <span className="text-sm text-gray-500">VS</span>&nbsp;
                        {bet?.teamB.map(b => b.display_name).join(", ")}
                    </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm text-gray-800 dark:text-gray-200 space-y-1">
                    <p className='text-center'>
                        <span className="font-semibold">Bet Status:</span>
                        <span>{status}</span>
                    </p>
                    {bet?.status === 'complete' && (
                        <>
                            <p className='text-center'>
                                <span className="font-semibold">Date Completed:</span> {bet?.dateCompleted}
                            </p>
                            {bet?.winner && bet?.winner !== 'none' && (
                                <p className='text-center'>
                                    <span className="font-semibold">Winner:</span> {bet[bet?.winner].map(x => x.display_name).join(', ')}
                                </p>
                            )}
                        </>
                    )}
                </div>
                {tags && tags}
                <div className="flex justify-evenly gap-3 flex-wrap">
                    <div>
                        <ul className="flex flex-wrap gap-1 justify-center list-none">
                            {bet?.teamA.map(player => (
                                <PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team="teamA" isWinner={bet?.winner} isVoid={bet?.status === 'void'} />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <ul className="flex flex-wrap gap-1 justify-center list-none">
                            {bet?.teamB.map(player => (
                                <PlayerTag key={player._id} playerName={player.display_name} playerId={player._id} team="teamB" isWinner={bet?.winner} isVoid={bet?.status === 'void'} />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {betContent}
                </div>
                {betPunishment && (
                    <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 break-words whitespace-pre-wrap">
                        <strong>Punishment:</strong>
                        <br />
                        {betPunishment}
                    </div>
                )}
                {bet?.link && (
                    <div className="text-center mt-4">
                        <Link
                            to={bet?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            <div className='flex items-center gap-2 p-2'>
                                <span>View Bet Link</span>
                                <FaDiscord className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>
                )}
                {bet?.challengeId && (
                    <div className="text-center mt-4">
                        <Link
                            to={`/challenges/${bet?.challengeId}`}
                            className="inline-block text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            <div className='flex items-center gap-2 p-2'>
                                <span>View original challenge</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className='flex items-center justify-content gap-2'>
                {adminToken && (
                    <NavigateButton to="edit" className='inline-block text-blue-600 dark:text-blue-400 hover:underline' isClean>Edit Bet</NavigateButton>
                )}
                <NavigateButton to=".." >Back</NavigateButton>
            </div>
        </>
    );
}