import { useState } from "react";
import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { sortByProperty } from "../../util/sort";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function ChallengeForm({ method }) {
    const { userId } = useRouteLoaderData('root');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, '0');
    const day = date.getDate();

    const [participants, setParticipants] = useState([]);
    let players = useRouteLoaderData('challenges-root');
    players = sortByProperty(players, "display_name").filter((p) => p.id !== userId);
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
            <div className="form-group">
                <label htmlFor="participants">Issue challenge to:</label>
                <select
                    name="participants"
                    id="participants"
                    value={participants}
                    onChange={OnClickParticipants}
                    size="15"
                    multiple>
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
            <Form method={method} className="form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" name="title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="statement">Challenge statement</label>
                    <textarea id="statement" type="text" name="statement" required rows={10} cols={20} />
                </div>
                <div className="form-group">
                    <label htmlFor="loser-punishment">Punishment</label>
                    <textarea id="loser-punishment" type="text" name="loser-punishment" required rows={10} cols={20} />
                </div>
                <div className="form-group">
                    <label htmlFor="challengeType">Challenge Type</label>
                    <div>
                        <input type="radio" id="open-challenge" name="challengeType" value="open" defaultChecked onChange={(event) => OnChangeChallengeType(event)} />
                        <label htmlFor="html">Open Challenge</label><br />
                        <input type="radio" id="close-challenge" name="challengeType" value="close" onChange={(event) => OnChangeChallengeType(event)} />
                        <label htmlFor="html">Closed Challenge</label><br />
                    </div>
                </div>
                {playerList && playerList}
                <div className="form-group">
                    <label htmlFor="challenge-enddate">Challenge until:</label>
                    <input
                        type="date"
                        id="challenge-enddate"
                        name="challenge-enddate"
                        defaultValue={`${year}-${month}-${day.toString().padStart(2, '0')}`}
                        min={`${year}-${month}-${day.toString().padStart(2, '0')}`}
                        max={`${year}-${month}-${(day + 7).toString().padStart(2, '0')}`} />
                </div>
                <button>Issue Challenge</button>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const userId = getPlayerId();
    const method = request.method;
    const data = await request.formData();

    const title = data.get('title');
    const statement = data.get('statement');
    const loserPunishment = data.get('loser-punishment');
    const challengeType = data.get('challengeType');
    const participants = data.getAll('participants');
    const challengeEndDate = data.get('challenge-enddate');
    const challengeData = {
        issuer: userId,
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