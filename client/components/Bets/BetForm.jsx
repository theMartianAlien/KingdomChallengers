import { useRef, useState } from "react";
import { Form, Link, useActionData, redirect, useRouteLoaderData } from "react-router-dom";

import Input from '../UI/Input';
import classes from './BetForm.module.css';
import { getAuthToken } from '../../util/auth';

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
        teamWinnerHandler(team);
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
                className={teamAWinner}
                onClick={() => OnSelectWinnerClick("teamA")} >
                WINNER
            </button>);
        teamBButtonWinner = (
            <button
                type="button"
                className={teamBWinner}
                onClick={() => OnSelectWinnerClick("teamB")} >
                WINNER
            </button>);
    }

    return (
        <>
            <Form method={method} className={classes.form}>
                {errors ?? (errors)}
                <div>
                    <div>
                        <input
                            type="hidden"
                            id="winner"
                            name="winner"
                            value={bet.winner ? bet.winner : ''} />
                    </div>
                    <Input
                        label="Title of Bet"
                        id="title"
                        name="title"
                        defaultValue={bet?.title} />
                    <div className="form-group">
                        <label htmlFor="bet-status">Bet Status</label>
                        <select
                            id="bet-status"
                            name="bet-status"
                            value={betStatusWinner.status}
                            onChange={OnChangeBetStatus}
                            disabled={bet?._id ? false : true}>
                            <option value="ongoing">On going</option>
                            <option value="void">Void</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <div className={"form-group "}>
                        <Input
                            label="Solved in chapter"
                            id="spoilers"
                            type="number"
                            name="spoilers"
                            defaultValue={bet?.chapter?.spoilers}
                        />
                    </div>
                    <div className={"form-group " + classes.participants}>
                        <div className={classes["participants-container"]}>
                            <span className={classes.teamName}>Participants A</span>
                            <ul>
                                {bet.teamA.map((a) => (<li key={a._id}>{a.display_name}</li>))}
                            </ul>
                            {/* <select
                                name="teamA"
                                id="teamA"
                                multiple
                                className={classes["teams-list"]}
                                value={teams.teamA.map((a) => (a._id))}
                                onChange={(event) => onChangeSelectHandler("teamA", event)}>
                                {sortedPlayer.map(player => (
                                    <option key={player._id} value={player._id}>
                                        {player.display_name}
                                    </option>
                                ))}
                            </select> */}
                            {teamAButtonWinner && teamAButtonWinner}
                        </div>
                        <div className={classes["participants-container"]}>
                            <span className={classes.teamName}>Participants B</span>

                            <ul>
                                {bet.teamB.map((team) => (<li key={team._id}>{team.display_name}</li>))}
                            </ul>
                            {/* <select
                                name="teamB"
                                id="teamB"
                                multiple
                                className={classes["teams-list"]}
                                value={teams.teamB.map((b) => (b._id))}
                                onChange={(event) => onChangeSelectHandler("teamB", event)}>
                                {sortedPlayer.map(player => (
                                    <option key={player._id} value={player._id}>
                                        {player.display_name}
                                    </option>
                                ))}
                            </select> */}
                            {teamBButtonWinner && teamBButtonWinner}
                        </div>
                    </div>
                    <Input
                        label="Chapter Start"
                        id="startChapter"
                        name="startChapter"
                        type="startChapter"
                        defaultValue={bet?.chapterStart}
                    />
                    <Input
                        label="Bet Link"
                        id="link"
                        name="link"
                        defaultValue={bet?.link}
                    />

                    <Input
                        label="Bet content"
                        id="text"
                        name="text"
                        textarea
                        rows="10"
                        defaultValue={bet?.text}
                    />

                    <Input
                        label="Punishment"
                        id="punishment"
                        name="punishment"
                        textarea
                        rows="4"
                        defaultValue={bet?.punishment}
                    />

                    <Input
                        label="Tags"
                        id="tags"
                        name="tags"
                        textarea
                        rows="4"
                        defaultValue={bet?.tags}
                    />
                </div>
                <div className={classes.actions}>
                    {token.adminToken && (<button className={classes.actions}>Save Bet</button>)}
                    <Link className={classes.actions} to=".." relative="path">
                        Back
                    </Link>
                </div>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const betId = params.betId;
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
        betId,
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

    let url = 'http://localhost:3000/bets/';
    if (method === 'PATCH') {
        url += betId;
    }

    const token = getAuthToken();

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(betData)
    });

    if (!response.ok) {
        const message = await response.json();
        return (message);
    }

    await response.json();
    let redirectText = '/bets';

    if (betId) {
        redirectText += "/" + betId;
    }

    return redirect(redirectText);
}