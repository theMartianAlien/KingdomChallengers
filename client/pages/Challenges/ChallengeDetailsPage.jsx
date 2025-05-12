import { redirect, useRouteLoaderData } from 'react-router-dom';
import CounterChallengeForm from '../../components/Challenges/CounterChallengeForm';
import { useState } from 'react';
import { getUserId } from '../../util/auth';
import CounterTable from '../../components/Challenges/CounterTable';
import { useGetFetch } from '../../hooks/useFetch';

export default function ChallengeDetailsPage() {
    let userId = getUserId();

    const { challenge } = useRouteLoaderData("challenge-detail");

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
    if (userId && challenge.issuer !== userId) {
        if (challenge.challengeType === 'open' ||
            (challenge.challengeType === 'close' && userId && challenge.participants.includes(userId))) {
            isOpen = (
                <div>
                    <button onClick={IsJoiningHandler}>{isJoining ? 'Undo' : 'Join Bet'}</button>
                    {counterCHallenge && counterCHallenge}
                </div>
            );
        }
    }
console.log(challenge);
    return (
        <>
            <div>
                <h2>{challenge.title}</h2>
                <p>
                    {challenge.statement}
                </p>
                <p>
                    {challenge.punishment}
                </p>
            </div>
            {isOpen && isOpen}
            <CounterTable />
        </>
    );
}

export async function loader({ request, params }) {
    const id = params.id;
    return await useGetFetch("challenges/" + id);
}

export async function action({ request, params }) {
    const userId = getUserId();
    const method = request.method;
    const challengeId = params.id;
    const data = await request.formData();
    const challenge = data.get('challenge');
    const punishment = data.get('punishment');
    const team = data.get('team');
    const id = data.get('id');

    const counterChallengeData = {
        challengeId,
        challenge,
        punishment,
        team,
        userId,
    }

    let url = 'http://localhost:3000/challenge-counter/';
    if (method === 'DELETE') {
        url += id;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(counterChallengeData)
    });

    if (!response.ok) {

    }

    const resData = await response.json();

    return redirect('/challenges/' + challengeId);
}