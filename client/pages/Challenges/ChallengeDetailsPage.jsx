import { redirect, useNavigation, useRouteLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getAccountId, getAuthToken, getPlayerId } from '../../util/auth';
import { useDeleteFetch, useGetFetch, usePatchPostFetch } from '../../hooks/useFetch';
import CounterChallengeForm from '../../components/Challenges/CounterChallengeForm';
import CounterTable from '../../components/Challenges/CounterTable';
import FormActionButton from '../../components/UI/Buttons/FormActionButton';
import UnderlinedLinks from '../../components/UI/Links/UnderlinedLink';

export default function ChallengeDetailsPage() {
    const accountId = getAccountId();
    const playerId = getPlayerId();
    const { challenge } = useRouteLoaderData("challenge-detail");
    const counters = challenge.counters;
    const [isJoining, setIsJoining] = useState(false);
    const navigation = useNavigation();
    const wasSubmitting = useRef(false);
    let counterChallengeForm;
    function IsJoiningHandler() {
        setIsJoining(!isJoining);
    }

    if (isJoining) {
        counterChallengeForm = (
            <div className="max-w-sm mx-auto">
                <CounterChallengeForm challengeId={challenge?._id}/>
            </div>);
    }

    let isOpen;
    if (accountId && challenge.issuer !== accountId && challenge.status === 'ready') {
        if (challenge.challengeType === 'open' ||
            (challenge.challengeType === 'close' && playerId && challenge.participants.includes(playerId))) {
            isOpen = (
                <div className='gap-1 py-1'>
                    <button
                        className="px-3 py-2 relative flex
                        items-center justify-center rounded-lg 
                        text-center font-medium focus:outline-none 
                        focus:ring-4 bg-gray-800 text-white hover:bg-gray-900
                        focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
                        dark:focus:ring-gray-700"
                        onClick={IsJoiningHandler}>{isJoining ? 'Undo' : 'Join Bet'}</button>
                    {counterChallengeForm && counterChallengeForm}
                </div>
            );
        }
    }

    const lockable = (counters && counters.length && counters.some((c) => c.action && c.action === 'accept' && c.team === 'against'))
    let lockButton;
    if (accountId && challenge.issuer === accountId && lockable > 0) {
        lockButton = (
            <div className='gap-1 py-1'>
                <FormActionButton
                    action={`/challenges/${challenge._id}/lock`}
                    method="patch"
                    label="LOCK IT!"
                    id={challenge._id}
                />
            </div>);
    }

    let deleteButton;
    if (accountId && challenge.issuer === accountId && challenge.status !== 'locked') {
        deleteButton = (
            <div className='gap-1 py-1'>
                <FormActionButton
                    action="delete"
                    method="patch"
                    label="Delete Challenge"
                    id={challenge._id}
                />
            </div>);
    }

    let editChallengeLink;
    if (challenge.issuer === accountId && challenge.status !== 'locked') {
        editChallengeLink = (<UnderlinedLinks label="Edit Challenge" to={`/challenges/${challenge._id}/edit`} />);
    }

    useEffect(() => {
        if (navigation.state === 'submitting') {
            wasSubmitting.current = true;
        }

        if (wasSubmitting.current && navigation.state === 'idle') {
            setIsJoining(false); // ✅ close the form AFTER submit completes
            wasSubmitting.current = false;
        }
    }, [navigation.state]);


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
                <div className="py-2 flex flex-row items-center justify-start gap-2">
                    {editChallengeLink && editChallengeLink}
                    {deleteButton && deleteButton}
                    {lockButton && lockButton}
                </div>
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
    } else if (isEdit && (accountId !== data.challenge.issuer)) {
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
        endpoint = 'challenges';
        endpoint += "/" + challengeId;
        resData = await useDeleteFetch(endpoint, token);
        return redirect('/challenges');
    }

    return redirect('/challenges/' + challengeId);
}