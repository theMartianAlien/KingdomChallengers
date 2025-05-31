import { Form, redirect, useParams } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";
import TextAreaField from '../UI/Fields/TextAreaField';
import RadioGroupField from '../UI/Fields/RadioGroupField';

export default function CounterChallengeForm() {
    const params = useParams();
    let challengeId = params?.id
    return (
        <>
            <Form method="post" action="/counter-challenge/new" className="flex max-w-md flex-col gap-4 py-4">
                <input value={challengeId} name="challengeId" type="hidden" />
                <TextAreaField
                    divClass="mb-5 block"
                    elementName="challenge"
                    labelClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    label="Challenge"
                    inputClass="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Counter challenge ..."
                    rows={3}
                />
                <TextAreaField
                    divClass="mb-5 block"
                    elementName="punishment"
                    labelClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    label="Punishment"
                    inputClass="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
                     focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Counter punishment ..."
                    rows={3}
                />
                <RadioGroupField
                    elementName="team"
                    label="Challenge side"
                    defaultValue="against"
                    data={[
                        { value: "pro", label: "Pro", elementName: "pro_team" },
                        { value: "against", label: "Against", elementName: "against_team" }
                    ]}
                    divClass="flex items-center justify-start gap-4"
                    labelClass="text-sm font-medium text-gray-900 dark:text-white"
                />
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