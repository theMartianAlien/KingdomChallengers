import { useMemo, useState } from "react";
import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getAccountId } from "../../util/auth";
import { sortByProperty } from "../../util/sort";
import { useDeleteFetch, usePatchPostFetch } from "../../hooks/useFetch";
import { CustomDatePicker } from "../UI/CustomDatePicker";
import InputField from "../UI/Fields/InputField";
import TextAreaField from "../UI/Fields/TextAreaField";
import RadioField from "../UI/Fields/RadioField";
import DropDownField from "../UI/Fields/DropDownField";

export default function ChallengeForm({ method }) {
    const { player_id } = useRouteLoaderData('root');
    const data = useRouteLoaderData('challenge-detail');
    let challenge;
    if (data && data.challenge) {
        challenge = data.challenge;
    }
    let players = useRouteLoaderData('challenges-root');
    players = players.filter((p) => p.id !== player_id)
    players = sortByProperty(players, "display_name");
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth().toString().padStart(2, '0');
    const day = date.getDate();
    const [participants, setParticipants] = useState(challenge?.participants || []);
    const [challengeType, setChallengeType] = useState(challenge?.challengeType || 'open');

    function OnChangeChallengeType(e) {
        let leChallenge = challengeType;
        if (leChallenge === 'open') {
            leChallenge = "close";
        } else if (leChallenge === 'close') {
            leChallenge = "open";
        }

        setChallengeType(leChallenge);
    }

    const playerList = useMemo(() => {
        if (challengeType !== 'close') return null;

        return (
            <DropDownField
                multiple={true}
                elementName="participants"
                disabled={challenge ? true : false}
                defaultValue={participants}
                label="Issue challenge to:"
                size={15}
                options={players.map(player => ({
                    value: player._id,
                    text: player.display_name
                }))}
            />
        );
    }, [challengeType, participants, players]);

    let actionForm = "/challenges"
    if (challenge) {
        actionForm += `/${challenge._id}/edit`
    } else {
        actionForm += `/new`
    }

    return (
        <>
            <Form method={method} className="max-w-sm mx-auto" action={actionForm}>
                <h2 className="block mb-2 text-3xl font-semibold  text-gray-900 dark:text-white">New Challenge</h2>
                <InputField
                    label="Title"
                    defaultValue={challenge?.title}
                    elementName="title"
                    placeholder="This is my challenge!"
                    required
                />
                <TextAreaField
                    label="Challenge"
                    elementName="statement"
                    defaultValue={challenge?.statement}
                    placeholder="Something will happen, I am sure of it!"
                    required
                />
                <TextAreaField
                    label="Punishment"
                    elementName="loser-punishment"
                    defaultValue={challenge?.loserPunishment}
                    placeholder="Your punishment is my joy!"
                    required
                />
                <div className="mb-5">
                    <fieldset>
                        <div className="flex items-center mb-4">
                            <label htmlFor="challengeType" className="block ms-2 text-m font-medium text-gray-900 dark:text-gray-300">Challenge Type</label>
                            {challenge && challenge.challengeType === 'open' && (<input value={challenge.challengeType} name="challengeType" type="hidden" />)}
                            {challenge && challenge.challengeType === 'close' && (
                                <>
                                <input value={challenge.challengeType} name="challengeType" type="hidden" />
                                <input value={challenge.participants.join(',')} name="participants" type="hidden" />
                                </>
                                )}
                        </div>
                        <RadioField
                            elementName="open-challenge"
                            checked={challengeType === 'open'}
                            groupName="challengeType"
                            value="open"
                            label="Open Challenge"
                            disabled={challenge ? true : false}
                            onChange={(e) => OnChangeChallengeType(e)}
                        />
                        <RadioField
                            elementName="close-challenge"
                            checked={challengeType === 'close'}
                            groupName="challengeType"
                            value="close"
                            label="Close Challenge"
                            disabled={challenge ? true : false}
                            onChange={(e) => OnChangeChallengeType(e)}
                        />
                    </fieldset>
                </div>
                {playerList && playerList}
                <div className="mb-5">
                    {challenge && (<input value={challenge.challengeEndDate} name="challenge-enddate" type="hidden" />)}
                    <CustomDatePicker
                        readOnly={challenge ? true : false}
                        name="challenge-enddate"
                        title="Challenge Duration Date"
                        minDate={new Date(year, month, day)}
                        defaultValue={new Date(year, month, day + 5)}
                        maxDate={new Date(year, month, day + 5)} />
                </div>
                <button className="border w-full text-white cursor-pointer
                bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                dark:focus:ring-primary-800">{challenge ? 'Update' : 'Issue'} Challenge</button>
            </Form>
        </>
    );
}

export async function action({ request, params }) {
    const id = getAccountId();
    const token = getAuthToken();
    const method = request.method;

    let redirectText = '/challenges';
    if (method === 'DELETE') {
        const resData = await useDeleteFetch("challenges/" + params.id, token);
        if (resData.status === 422 || resData.status === 401) {
            return resData;
        }
        return redirect(redirectText);
    }
    const data = await request.formData();
    const title = data.get('title');
    const statement = data.get('statement');
    const loserPunishment = data.get('loser-punishment');
    const challengeType = data.get('challengeType');
    let participants = data.getAll('participants');
    if(challengeType === 'close') {
        participants = participants[0].split(',');
    }
    const challengeEndDate = data.get('challenge-enddate');
    let challengeData = {
        issuer: id,
        status: 'ready',
        title,
        statement,
        loserPunishment,
        challengeType,
        challengeEndDate,
        participants
    }
    if (method === 'PATCH') {
        challengeData._id = params.id
        redirectText += '/' + params.id;
    }

    const resData = await usePatchPostFetch("challenges", method, challengeData, token);

    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }
    return redirect(redirectText);
}