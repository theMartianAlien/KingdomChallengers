import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";
import DeleteButton from "../UI/Buttons/DeleteButton";

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
    let acceptReject = counters.some(counter => counter.playerId !== playerId);
    let deleteCounter = counters.some(counter => counter.playerId === playerId);
    let actioned = counters.some(counter => counter.action && counter.action !== 'none');
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
                        {acceptReject && token && (<th className={colSize}>Accept</th>)}
                        {acceptReject && token && (<th className={colSize}>Reject</th>)}
                        {deleteCounter && token && (<th className={colSize}>Delete</th>)}
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
                            {actioned && (<th className={colSize + " capitalize"}>{(counter.action) + "ed"}</th>)}
                            {acceptReject && token && (
                                <td className={colSize}>
                                    <Form method="patch" action={`${counter._id}/counter/accept`}>
                                        <input type="hidden" name="action" value="accept" />
                                        <input type="hidden" name="id" value={counter._id} />
                                        <button className="">Accept</button>
                                    </Form>
                                </td>)
                            }
                            {acceptReject && token && (
                                <td className={colSize}>
                                    <Form method="patch" action={`${counter._id}/counter/reject`}>
                                        <input type="hidden" name="action" value="reject" />
                                        <input type="hidden" name="id" value={counter._id} />
                                        <button>Reject</button>
                                    </Form>
                                </td>)
                            }
                            {deleteCounter && token && (
                                <td className={colSize}>
                                    <DeleteButton />
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
    const method = request.method;
    const leAction = params.action;
    const counterDataAction = {
        action: leAction
    }
    const token = getAuthToken();
    const resData = await usePatchPostFetch("counter-challenge", method, counterDataAction, token);

    return redirect("/challenges/" + params.id);
}