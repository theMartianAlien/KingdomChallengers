import { redirect, useNavigation, useRouteLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getAccountId, getAdminToken, getAuthToken, getPlayerId } from '../../util/auth';
import { useDeleteFetch, useGetFetch, usePatchPostFetch } from '../../hooks/useFetch';
import CounterChallengeForm from '../../components/Challenges/CounterChallengeForm';
import CounterTable from '../../components/Challenges/CounterTable';
import UnderlinedLink from '../../components/UI/Links/UnderlinedLink';
import CustomButton from '../../components/UI/Buttons/CustomButton';
import FormActionButton from '../../components/UI/Buttons/FormActionButton';

export default function ChallengeDetailsPage() {
    const accountId = getAccountId();
    const playerId = getPlayerId();
    const adminToken = getAdminToken();
    const { challenge } = useRouteLoaderData("challenge-detail");
    if(!challenge){
        return <p>Invalid challenge!</p>
    }
    const counters = challenge?.counters;
    const [isJoining, setIsJoining] = useState(false);
    const navigation = useNavigation();
    const wasSubmitting = useRef(false);

    const isLocked = challenge?.status === 'locked';

    function IsJoiningHandler() {
        setIsJoining(!isJoining);
    }

    let isJoinable;
    if (!isLocked && accountId && challenge?.issuer !== accountId && challenge?.status === 'ready') {
        if (challenge?.challengeType === 'open' ||
            (challenge?.challengeType === 'close' && playerId && challenge?.participants.includes(playerId))) {
            isJoinable = (
                <div className='gap-1 py-1'>
                    <CustomButton
                        className="px-3 py-2 relative flex
                        items-center justify-center rounded-lg 
                        text-center font-medium focus:outline-none 
                        focus:ring-4 bg-gray-800 text-white hover:bg-gray-900
                        focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
                        dark:focus:ring-gray-700"
                        onClick={IsJoiningHandler}>{isJoining ? 'Undo' : 'Join Bet'}
                    </CustomButton>
                    {isJoining && (
                        <div className="max-w-sm mx-auto">
                            <CounterChallengeForm/>
                        </div>)}
                </div>
            );
        }
    }

    let lockButton;
    let deleteButton;
    let editChallengeLink;
    if (!isLocked && accountId && challenge?.issuer === accountId) {
        deleteButton = (
            <FormActionButton
                action="delete"
                method="delete">
                <CustomButton type='submit' className="
            bg-red-900 
            hover:bg-red-700 
            focus:ring-red-300

            dark:bg-red-900 
            dark:hover:bg-red-700
            dark:focus:ring-red-800">DELETE CHALLENGE</CustomButton>
            </FormActionButton>
        );
        editChallengeLink = (
            <UnderlinedLink
                label="Edit Challenge"
                to={`/challenges/${challenge._id}/edit`}
                className={"font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"}
                isClean={true}
            />);
        const lockable = counters?.some((c) => c?.action === 'accept' && c.team === 'against')
        if (lockable > 0) {
            lockButton = (
                <FormActionButton
                    action={`/challenges/${challenge._id}/lock`}
                    method="patch">
                    <CustomButton type='submit' className="
            bg-yellow-900 
            hover:bg-yellow-700 
            focus:ring-yellow-300
            
            dark:bg-yellow-900 
            dark:hover:bg-yellow-700
            dark:focus:ring-yellow-800">LOCK IT</CustomButton>
                </FormActionButton>
            );
        }
    }
    let convertButton
    if(adminToken && isLocked && !challenge.converted) {
        convertButton = (
            <UnderlinedLink
                label="Convert challenge"
                to={`/challenges/${challenge._id}/convert`}
                className={"font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"}
                isClean={true}
            />);
    }

    useEffect(() => {
        if (navigation.state === 'submitting') {
            wasSubmitting.current = true;
        }

        if (wasSubmitting.current && navigation.state === 'idle') {
            setIsJoining(false);
            wasSubmitting.current = false;
        }
    }, [navigation.state]);

    return (
        <>
            <div className="max-w-4xl mx-auto p-5 lg:p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-2 my-10">
                <h2 className="text-4xl font-extrabold dark:text-white text-black">
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
                    {convertButton && convertButton}
                </div>
                {isJoinable && isJoinable}
                <CounterTable />
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