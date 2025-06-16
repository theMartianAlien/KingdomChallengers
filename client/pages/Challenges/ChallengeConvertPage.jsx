import { Form, Link, redirect, useRouteLoaderData } from "react-router-dom";
import InputField from "../../components/UI/Fields/InputField";
import TextAreaField from "../../components/UI/Fields/TextAreaField";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function ChallengeConvertPage() {

    const { challenge } = useRouteLoaderData("challenge-detail");

    if (challenge.status !== 'locked') {
        return redirect('/challenges/' + challenge._id);
    }
    if (challenge.converted) {
        return redirect('/challenges/');
    }

    const token = useRouteLoaderData('root');
    const counters = challenge.counters;
    const pro = counters.filter(counter => counter.team === 'pro');
    const against = counters.filter(counter => counter.team === 'against');
    let challengeStatement = challenge?.statement + "\n" + "Pro: \n" + pro.map(p => (p.challenge)) + "Against: \n" + against.map(a => (a.challenge))
    let challengePunishment = challenge?.loserPunishment + "\n" + "Pro: \n" + pro.map(p => (p.punishment)) + "Against: \n" + against.map(a => (a.punishment))

    let teamA = [{ display_name: challenge?.issuer.nickname, _id: challenge?.issuer?.player_id }];
    let teamB = against.map(p => { return { display_name: p.playerId.display_name, _id: p.playerId._id } });

    return (
        <>
            <Form method="post" className="space-y-6 w-full max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <InputField
                    label="Title of Bet"
                    elementName="title"
                    defaultValue={challenge?.title}
                />
                <div className="space-y-2">
                    <input name="bet-status" value="ongoing" type="hidden" />
                    <label htmlFor="bet-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Bet Status
                    </label>
                    <select
                        id="bet-status"
                        name="bet-status"
                        value="ongoing"
                        disabled
                        className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="ongoing">On going</option>
                        <option value="void">Void</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                    <input name="teamA" value={teamA.map(t => t._id).join(',')} type="hidden" />
                    {/* Team A */}
                    <div className="w-full sm:w-1/2 border rounded-md p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <span className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Participants A</span>
                        <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-100">
                            {teamA.map((a) => (
                                <li key={a._id}>{a.display_name}</li>
                            ))}
                        </ul>
                    </div>

                    <input name="teamB" value={teamB.map(t => t._id).join(',')} type="hidden" />
                    {/* Team B */}
                    <div className="w-full sm:w-1/2 border rounded-md p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <span className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Participants B</span>
                        <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-100">
                            {teamB.map((b) => (
                                <li key={b._id}>{b.display_name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <TextAreaField
                    label="Bet content"
                    elementName="text"
                    className="p-3 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="5"
                    defaultValue={challengeStatement}
                />

                <TextAreaField
                    label="Punishment"
                    elementName="punishment"
                    className="p-3 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="5"
                    defaultValue={challengePunishment}
                />

                <TextAreaField
                    label="Tags"
                    elementName="tags"
                    rows="5"
                // defaultValue={bet?.tags}
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
    const adminToken = getAdminToken();
    const method = request.method;
    const challengeId = params.id;
    const data = await request.formData();
    const title = data.get('title');
    const teamA = data.get('teamA').split(',');
    const teamB = data.get('teamB').split(',');
    const status = 'ongoing';
    const text = data.get('text');
    const punishment = data.get('punishment');

    const betChallenge = {
        title,
        status,
        teamA,
        teamB,
        text,
        punishment,
        challengeId
    }

    console.log(betChallenge);
    const resData = await usePatchPostFetch("bets", method, betChallenge, adminToken);

    const bet = resData?.bet;
    if (bet) {
        return redirect('/bets/' + bet._id);
    }
}