import { Link, redirect, useRouteLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { getAccountId, getAuthToken, getPlayerId } from '../../util/auth';
import CounterChallengeForm from '../../components/Challenges/CounterChallengeForm';
import CounterTable from '../../components/Challenges/CounterTable';
import { useDeleteFetch, useGetFetch, usePatchPostFetch } from '../../hooks/useFetch';
import TestButton from '../../components/UI/Buttons/TestButton';

export default function ChallengeDetailsPage() {
    const accountId = getAccountId();
    const playerId = getPlayerId();
    const { challenge, counters } = useRouteLoaderData("challenge-detail");
    console.log(challenge);
    const [isJoining, setIsJoining] = useState(false);
    let counterCHallenge;
    function IsJoiningHandler() {
        setIsJoining(!isJoining);
    }

    function CounterChallengeFormSubmit() {
        setIsJoining(false);
    }

    if (isJoining) {
        counterCHallenge = (<CounterChallengeForm onSubmit={CounterChallengeFormSubmit} />);
    }

    let isOpen;
    if (accountId && challenge.issuer !== accountId && challenge.status === 'ready') {
        if (challenge.challengeType === 'open' ||
            (challenge.challengeType === 'close' && playerId && challenge.participants.includes(playerId))) {
            isOpen = (
                <div className='py-2'>
                    <button className="px-3 py-2 relative flext
                 items-center justify-center rounded-lg 
                 text-center font-medium focus:outline-none 
                 focus:ring-4 bg-gray-800 text-white hover:bg-gray-900
                  focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
                  dark:focus:ring-gray-700" onClick={IsJoiningHandler} type='none'>{isJoining ? 'Undo' : 'Join Bet'}</button>
                    <div className="max-w-sm mx-auto">
                        {counterCHallenge && counterCHallenge}
                    </div>
                </div>
            );
        }
    }

    function onClickLockButton(_id) {

    }

    const lockable = (counters && counters.length && counters.some((c) => c.action && c.action === 'accept' && c.team === 'against'))
    let lockButton;
    if (accountId && challenge.issuer === accountId && lockable > 0) {
        lockButton = (<div className='gap-1 py-1'>
            <TestButton _id={challenge._id} label={"LOCK IT!"} onClick={onClickLockButton} />
        </div>);
    }
    return (
        <>
            <div className="max-w-4xl mx-auto p-5 lg:p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-2 my-10">
                <h2 className="text-4xl font-extrabold dark:text-white">
                    {challenge.title}
                </h2>
                <h3 className="text-xl font-extrabold dark:text-yellow-500">
                    {challenge.challenger}
                </h3>
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {challenge.statement}
                </div>
                <div className="mt-4 p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 break-words whitespace-pre-wrap">
                    <strong>Punishment:</strong>
                    <br />
                    {challenge.loserPunishment}
                </div>
                {challenge.issuer === accountId && (
                    <Link to={`/challenges/${challenge._id}/edit`}>
                        Edit Challenge
                    </Link>
                )}
                {lockButton && lockButton}
                {isOpen && isOpen}
                <div className='py-1'>
                    <CounterTable />
                </div>
            </div>
        </>
    );
}

export async function loader({ request, params }) {
    const id = params.id;
    const url = new URL(request.url);
    const data = await useGetFetch("challenges/" + id);
    const accountId = getAccountId();
    const isEdit = url.pathname.includes("/edit");
    if (isEdit && (
        !accountId ||
        !data ||
        !data.challenge && 
        (accountId !== data.challenge.issuer))
    ) {
        return redirect('/login');
    } else if (isEdit && (accountId !== data.challenge.issuer)){
        return redirect('/challenges/' + id);
    }
    return data;
}

export async function action({ request, params }) {
    const playerId = getPlayerId();
    const method = request.method;
    const challengeId = params.id;
    const data = await request.formData();
    const challenge = data.get('challenge');
    const punishment = data.get('punishment');
    const team = data.get('team');

    const counterChallengeData = {
        challengeId,
        challenge,
        punishment,
        team,
        playerId,
    }

    let endpoint = "counter-challenge"
    const token = getAuthToken();
    let resData;
    if (method === 'POST') {
        resData = await usePatchPostFetch(endpoint, method, counterChallengeData, token);
    } else if (method === 'DELETE') {
        const id = data.get("delete-id");
        endpoint += "/" + id;
        resData = await useDeleteFetch(endpoint, token);
    }

    return redirect('/challenges/' + challengeId);
}