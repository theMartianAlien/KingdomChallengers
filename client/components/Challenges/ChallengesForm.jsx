import { useState } from "react";
import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getAccountId } from "../../util/auth";
import { sortByProperty } from "../../util/sort";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { CustomDatePicker } from "../UI/CustomDatePicker";

export default function ChallengeForm({ method }) {
    const { player_id } = useRouteLoaderData('root');
    let players = useRouteLoaderData('challenges-root');
    players = sortByProperty(players, "display_name").filter((p) => p.id !== player_id);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, '0');
    const day = date.getDate();
    const [participants, setParticipants] = useState([]);
    const [challengeType, setChallengeType] = useState("open");

    function OnChangeChallengeType() {
        let challenge = challengeType;
        if (challenge === 'open') {
            challenge = "close";
        } else if (challenge === 'close') {
            challenge = "open";
        }

        setChallengeType(challenge);
    }

    function OnClickParticipants(event) {
        const value = event.target.value;
        setParticipants((prevSelectedValues) => {
            if (prevSelectedValues.includes(value)) {
                return prevSelectedValues.filter((item) => item !== value);
            } else {
                return [...prevSelectedValues, value];
            }
        });
    }

    let playerList;
    if (challengeType === 'close') {
        playerList = (
            <div className="mb-5">
                <label htmlFor="participants" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue challenge to:</label>
                <select multiple className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="participants"
                    id="participants"
                    defaultChecked={participants}
                    onChange={OnClickParticipants}
                    size="15">
                    {players.map(player => (
                        <option key={player._id} value={player._id}>
                            {player.display_name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <>
            <Form method={method} className="max-w-sm mx-auto">                
                <h2  className="block mb-2 text-3xl font-semibold  text-gray-900 dark:text-white">New Challenge</h2>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="This is my challenge!" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="statement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Challenge</label>
                    <textarea id="statement" name="statement" rows={10} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Something will happen, I am sure of it!" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="loser-punishment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Punishment</label>
                    <textarea id="loser-punishment" name="loser-punishment" rows={10} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Something will happen, I am sure of it!" required />
                </div>
                <div className="mb-5">
                    <fieldset>
                        <div className="flex items-center mb-4">
                            <label htmlFor="challengeType" className="block ms-2 text-m font-medium text-gray-900 dark:text-gray-300">Challenge Type</label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="radio" id="open-challenge" name="challengeType" value="open" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked onChange={(event) => OnChangeChallengeType(event)} />
                            <label htmlFor="open-challenge" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Open Challenge
                            </label>
                        </div>
                        <div className="flex items-center mb-4">
                            <input type="radio" id="close-challenge" name="challengeType" value="close" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" onChange={(event) => OnChangeChallengeType(event)} />
                            <label htmlFor="close-challenge" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Close Challenge
                            </label>
                        </div>
                    </fieldset>
                </div>
                {playerList && playerList}
                <div className="mb-5">
                    <CustomDatePicker
                        name="challenge-enddate"
                        title="Challenge Duration Date"
                        minDate={new Date(year, month, day)}
                        value={new Date(year, month, day+ 5)}
                        maxDate={new Date(year, month, day + 5)} />
                </div>
                <button className="border w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Issue Challenge</button>

            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const id = getAccountId();
    const method = request.method;
    const data = await request.formData();

    const title = data.get('title');
    const statement = data.get('statement');
    const loserPunishment = data.get('loser-punishment');
    const challengeType = data.get('challengeType');
    const participants = data.getAll('participants');
    const challengeEndDate = data.get('challenge-enddate');
    const challengeData = {
        issuer: id,
        status: 'ready',
        title,
        statement,
        loserPunishment,
        challengeType,
        challengeEndDate,
        participants
    }

    const token = getAuthToken();
    const resData = await usePatchPostFetch("challenges", method, challengeData, token);

    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }

    return redirect('/challenges');
}