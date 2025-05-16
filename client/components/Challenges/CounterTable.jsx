import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import classes from './CounterTable.module.css';
import { getAuthToken, getPlayerId } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function CounterTable() {
    const playerId = getPlayerId();
    const { counters } = useRouteLoaderData("challenge-detail");
    const userId = getPlayerId();
    if (!counters || counters.length <= 0) {
        return undefined;
    }
    let acceptReject = counters.some(counter => counter.playerId !== playerId);
    let deleteCounter = counters.some(counter => counter.playerId === playerId);
    return (
        <div className={classes["table-container"]}>
            <table>
                <thead>
                    <tr>
                        <th className="px-6 py-3">Title</th>
                        <th className="px-6 py-3">Challenge</th>
                        <th className="px-6 py-3">Punishment</th>
                        <th className="px-6 py-3">Team</th>
                        <th className="px-6 py-3">Player</th>
                        {
                            acceptReject && (
                                <th className="px-6 py-3">Accept</th>)
                        }
                        {
                            acceptReject && (
                                <th className="px-6 py-3">Reject</th>)
                        }
                        {
                            deleteCounter && (
                                <th className="px-6 py-3">Delete</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {counters.map((counter) => (
                        <tr key={counter._id}>
                            <td className="px-6 py-3">
                                {counter.title}
                            </td>
                            <td className="px-6 py-3">
                                {counter.statement}
                            </td>
                            <td className="px-6 py-3">
                                {counter.loserPunishment}
                            </td>
                            <td className="px-6 py-3">
                                {counter.team}
                            </td>
                            <td className="px-6 py-3">
                                {counter.player_name}
                            </td>
                            {
                                acceptReject && (
                                    <td className="px-6 py-3">
                                        <Form method="patch" action={`${counter._id}/counter/accept`}>

                                            <input type="hidden" name="action" value="accept" />
                                            <input type="hidden" name="id" value={counter._id} />
                                            <button className="">Accept</button>
                                        </Form>
                                    </td>)
                            }
                            {
                                acceptReject && (
                                    <td className="px-6 py-3">
                                        <Form method="patch" action={`${counter._id}/counter/reject`}>

                                            <input type="hidden" name="action" value="reject" />
                                            <input type="hidden" name="id" value={counter._id} />
                                            <button>Reject</button>
                                        </Form>
                                    </td>)
                            }
                            {
                                deleteCounter && (
                                    <td className="px-6 py-3">
                                        <Form method="delete">
                                            <button>Delete</button>
                                        </Form>
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
    const id = params.counterId;
    const leAction = params.action;
    const counterDataAction = {
        _id: id,
        action: leAction
    }
    const token = getAuthToken();
    const resData = await usePatchPostFetch("counter-challenge", method, counterDataAction, token);

    return redirect("/challenges/" + params.id);
}