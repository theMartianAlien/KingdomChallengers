import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { useDeleteFetch, usePatchPostFetch } from "../../hooks/useFetch";
import DeleteButton from "../UI/Buttons/DeleteButton";
import CustomButton from "../UI/Buttons/CustomButton";

export default function CounterTable() {

    const divClass = "relative overflow-x-auto shadow-md sm:rounded-lg lg:p-8";
    const tableClass = "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400";
    const headerClass = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400";
    const rowClass = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-20";
    const firstColClass = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
    const colSize = "px-6 py-4 text-center";

    const playerId = getPlayerId();
    const token = getAuthToken();
    const { challenge } = useRouteLoaderData("challenge-detail");
    const counters = challenge.counters;
    if (!counters || counters.length <= 0) {
        return undefined;
    }
    let acceptReject = counters.some(counter => counter.playerId._id !== playerId);
    let deleteCounter = counters.some(counter => counter.playerId._id === playerId);
    let actioned = counters.some(counter => counter.action && counter.action !== 'none');
    let status = counters.some(counter => counter.status && counter.status === 'locked');
    return (
        <div className={divClass}>
            <table className={tableClass}>
                <thead className={headerClass}>
                    <tr>
                        <th className={colSize}>Challenge</th>
                        <th className={colSize}>Punishment</th>
                        <th className={colSize}>Team</th>
                        <th className={colSize}>Player</th>
                        {actioned && (<th className={colSize}>Status</th>)}
                        {status && (<th className={colSize}>Is Locked</th>)}
                        {token && acceptReject && !status && (<th className={colSize}>Accept</th>)}
                        {token && acceptReject && !status && (<th className={colSize}>Reject</th>)}
                        {token && deleteCounter && (<th className={colSize}>Delete</th>)}
                    </tr>
                </thead>
                <tbody>
                    {counters.map((counter) => (
                        <tr key={counter._id} className={rowClass}>
                            <th className={firstColClass}>
                                {counter.challenge}
                            </th>
                            <td className={colSize}>
                                {counter.punishment}
                            </td>
                            <td className={colSize + " capitalize"}>
                                {counter.team}
                            </td>
                            <td className={colSize}>
                                {counter.playerId.display_name}
                            </td>
                            {actioned && (<th className={colSize + " capitalize"}>{(counter.action) + (counter.action === 'locked' ? '' : 'ed')}</th>)}
                            {status && (<th className={colSize + " capitalize"}>{counter.status}</th>)}
                            {token && !status && counter.playerId._id !== playerId && (
                                <td className={colSize}>
                                    <Form method="patch" action={`/counter-challenge/${counter._id}/accept`}>
                                        <input type="hidden" name="challengeId" value={challenge._id} />
                                        <input type="hidden" name="playerId" value={counter.playerId._id} />
                                        <CustomButton disabled={counter?.action === 'locked'} className="bg-green-200 dark:bg-green-600 hover:bg-blue-900" type="submit">Accept</CustomButton>
                                    </Form>
                                </td>)
                            }
                            {token && !status && counter.playerId._id !== playerId && (
                                <td className={colSize}>
                                    <Form method="patch" action={`/counter-challenge/${counter._id}/reject`}>
                                        <input type="hidden" name="challengeId" value={challenge._id} />
                                        <input type="hidden" name="playerId" value={counter.playerId._id} />
                                        <CustomButton disabled={counter?.action === 'locked'} className="bg-red-200 dark:bg-red-600 hover:bg-blue-900" type="submit">Reject</CustomButton>
                                    </Form>
                                </td>)
                            }
                            {token && counter.playerId._id === playerId && (
                                <td className={colSize}>
                                    <DeleteButton prefixEndpoint="counter-challenge" _id={counter._id} returnId={challenge._id} />
                                </td>)
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export async function action({ request, params }) {
    const token = getAuthToken();
    const method = request.method;
    const data = await request.formData();
    if (method === 'DELETE') {
        const returnId = data.get("id");
        const resData = await useDeleteFetch("counter-challenge/" + params.id, token)
        if (resData.status === 422 || resData.status === 401 || resData.status === 404) {
            return resData;
        }
        return redirect("/challenges/" + returnId);
    }
    const challengeId = data.get('challengeId');
    const playerId = data.get('playerId');
    const action = params.action;
    const counterDataAction = {
        _id: params.id,
        challengeId: challengeId,
        action,
        playerId
    }
    const resData = await usePatchPostFetch("counter-challenge", method, counterDataAction, token);

    return redirect("/challenges/" + challengeId);
}