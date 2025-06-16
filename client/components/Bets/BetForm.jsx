import { useRef, useState } from "react";
import { Form, Link, useActionData, redirect, useRouteLoaderData } from "react-router-dom";

import classes from './BetForm.module.css';
import { getAdminToken } from '../../util/auth';
import { usePatchPostFetch } from "../../hooks/useFetch";
import InputField from "../UI/Fields/InputField";
import TextAreaField from "../UI/Fields/TextAreaField";

export default function BetForm() {
    const method = "patch";
    const { bet, players } = useRouteLoaderData("bet-detail");
    const token = useRouteLoaderData('root');
    const message = useActionData();
    const winner = useRef(bet?.winner);
    const [teams, setTeams] = useState({
        teamA: bet.teamA,
        teamB: bet.teamB
    });
    const [betStatusWinner, setBetStatusWinner] = useState({
        status: bet.status,
        winner: bet.winner
    });

    function betStatusHandler(status) {
        setBetStatusWinner((prevState) => {
            return {
                ...prevState,
                status
            }
        });
    }
    const OnChangeBetStatus = (e) => {
        betStatusHandler(e.target.value);
    };

    let errors = '';
    if (message) {
        errors = (
            <>
                <div><p>
                    {message.message}
                </p>
                    <Link to={`/bets/${message.message.link}`}>Go to Bet</Link>
                </div>
            </>);
    }

    function onChangeSelectHandler(id, event) {
        const selected = Array.from(event.target.options)
            .filter(option => option.selected)
            .map(option => option.value);
        setTeams((prevState) => {
            return {
                ...prevState,
                [id]: selected
            }
        });
    }

    function OnSelectWinnerClick(team) {
        if (betStatusWinner.winner === team) {
            team = "";
        }
        winner.current = team;
        betStatusHandler("complete");
    }

    let teamAWinner = classes.winselector;
    let teamBWinner = classes.winselector;

    if (betStatusWinner.winner) {
        if (betStatusWinner.winner === 'teamA') {
            teamAWinner += ' ' + classes.winnerteam
            teamBWinner += ' ' + classes.loserteam
        } else if (betStatusWinner.winner === 'teamB') {
            teamAWinner += ' ' + classes.loserteam
            teamBWinner += ' ' + classes.winnerteam
        }
    }

    let teamAButtonWinner, teamBButtonWinner;

    if (bet._id) {
        teamAButtonWinner = (
            <button
                type="button"
                className={teamAWinner + " cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                onClick={() => OnSelectWinnerClick("teamA")} >
                WINNER
            </button>);
        teamBButtonWinner = (
            <button
                type="button"
                className={teamBWinner + " cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                onClick={() => OnSelectWinnerClick("teamB")} >
                WINNER
            </button>);
    }

    return (
        <>
            <Form method={method} className="space-y-6 w-full max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                {errors && <p className="text-red-500 dark:text-red-400">{errors}</p>}

                <input type="hidden" id="winner" name="winner" value={bet.winner ?? ''} />
                <InputField
                    label="Title of Bet"
                    elementName="title"
                    defaultValue={bet?.title}
                />
                <div className="space-y-2">
                    <label htmlFor="bet-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Bet Status
                    </label>
                    <select
                        id="bet-status"
                        name="bet-status"
                        value={betStatusWinner.status}
                        onChange={OnChangeBetStatus}
                        disabled={!bet?._id}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="ongoing">On going</option>
                        <option value="void">Void</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                <InputField
                    label="Solved in chapter"
                    elementName="spoilers"
                    inputClass="
                    rounded-md
                    border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-100 w-full
                    p-2"
                    defaultValue={bet?.chapter?.spoilers}
                />

                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Team A */}
                    <div className="w-full sm:w-1/2 border rounded-md p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <span className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Participants A</span>
                        <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-100">
                            {bet.teamA.map((a) => (
                                <li key={a._id}>{a.display_name}</li>
                            ))}
                        </ul>
                        {teamAButtonWinner && teamAButtonWinner}
                    </div>

                    {/* Team B */}
                    <div className="w-full sm:w-1/2 border rounded-md p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <span className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Participants B</span>
                        <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-100">
                            {bet.teamB.map((b) => (
                                <li key={b._id}>{b.display_name}</li>
                            ))}
                        </ul>
                        {teamBButtonWinner && teamBButtonWinner}
                    </div>
                </div>

                <InputField
                    label="Bet Link"
                    elementName="link"
                    labelClass="!text-black"
                    inputClass="p-3 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={bet?.link}
                />

                <TextAreaField
                    label="Bet content"
                    elementName="text"
                    labelClass="!text-black"
                    className="p-3 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="5"
                    defaultValue={bet?.text}
                />

                <TextAreaField
                    label="Punishment"
                    elementName="punishment"
                    className="p-3 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="5"
                    defaultValue={bet?.punishment}
                />

                <TextAreaField
                    label="Tags"
                    elementName="tags"
                    rows="5"
                    defaultValue={bet?.tags}
                />

                <div className="flex items-center gap-4 mt-6">
                    {token.adminToken && (
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Save Bet
                        </button>
                    )}
                    <Link
                        to=".."
                        relative="path"
                        className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Back
                    </Link>
                </div>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const _id = params.id;
    const data = await request.formData();
    const title = data.get('title');
    const teamA = data.getAll('teamA');
    const teamB = data.getAll('teamB');
    const status = data.get('bet-status') ?? 'ongoing';
    const winner = data.get('winner');
    const link = data.get('link');
    const text = data.get('text');
    const spoilers = data.get('spoilers');
    const sense = data.get('sense');
    const punishment = data.get('punishment');
    const tagsToSplit = data.get('tags');
    let tags = [];
    if (tagsToSplit) {
        tags = tagsToSplit.split("\n");
    }
    const betData = {
        _id,
        title,
        players: {
            teamA,
            teamB
        },
        dateCompleted: "",
        status,
        winner,
        link,
        text,
        chapter: {
            spoilers,
            sense
        },
        punishment,
        tags
    }

    const token = getAdminToken();
    const resData = await usePatchPostFetch("bets", method, betData, token);

    let redirectText = '/bets';

    if (_id) {
        redirectText += "/" + _id;
    }

    return redirect(redirectText);
}