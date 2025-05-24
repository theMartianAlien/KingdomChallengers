import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function CounterChallengeForm({challengeId}) {

    const [teamValue, setTeamValue] = useState('pro');

    function onChange() {
        let value = "pro";
        if (teamValue === 'against') {
            value = 'pro'
        }
        setTeamValue(value);
    }

    return (
        <>
            <Form method="post" action="/counter-challenge/new" className="flex max-w-md flex-col gap-4 py-4">
                <input value={challengeId} name="challengeId" type="hidden" />
                <div className="mb-2 block">
                    <label htmlFor="challenge" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Challenge</label>
                    <textarea id="challenge" type="text" name="challenge" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Counter challenge ..." />
                </div>
                <div className="mb-2 block">
                    <label htmlFor="punishment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Punishment</label>
                    <textarea id="punishment" type="text" name="punishment" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Counter punishment ..." />
                </div>
                <div className="flex items-center justify-start gap-4">
                    <div className="flex items-center">
                        <label htmlFor="team" className="text-sm font-medium text-gray-900 dark:text-white">Team Side</label>
                    </div>
                    <div className="flex items-center">
                        <input id="team-against" type="radio" value="against" name="team"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600" defaultChecked={true} onChange={onChange} />
                        <label htmlFor="team-against" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Against
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input id="team-pro" type="radio" value="pro" name="team"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600" onChange={onChange} />
                        <label htmlFor="team-pro" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Pro
                        </label>
                    </div>
                </div>
                <button className="px-4 py-2 relative flex
                 items-center justify-center rounded-lg 
                 text-center font-medium focus:outline-none 
                 focus:ring-4 bg-gray-800 text-white hover:bg-gray-900
                  focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
                  dark:focus:ring-gray-700" type="submit">Join Bet</button>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const playerId = getPlayerId();
    const method = request.method;
    const data = await request.formData();
    const challengeId = data.get('challengeId');
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
    const resData = await usePatchPostFetch(endpoint, method, counterChallengeData, token);
    return redirect('/challenges/' + challengeId);
}