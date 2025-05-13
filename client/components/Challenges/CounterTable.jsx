import { Form, useRouteLoaderData } from "react-router-dom";
import classes from './CounterTable.module.css';
import { getPlayerId } from "../../util/auth";

export default function CounterTable() {
    const { counters, players } = useRouteLoaderData("challenge-detail");
    const userId = getPlayerId();

    if (!counters || counters.length <= 0) {
        return undefined;
    }

    function getPlayer(id) {
        return players.find((player) => player.id === id).name;
    }

    return (
        <div className={classes["table-container"]}>
            <table>
                <thead>
                    <tr>
                        <th>Challenge</th>
                        <th>Punishment</th>
                        <th>Team</th>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {counters.map((counter) => (
                        <tr key={counter.id}>
                            <td>
                                {counter.challenge}
                            </td>
                            <td>
                                {counter.punishment}
                            </td>
                            <td>
                                {counter.team}
                            </td>
                            <td>
                                {getPlayer(counter.userId)}
                            </td>
                            {userId === counter.userId && (
                                <td>
                                    <Form method="delete">
                                        <input type="hidden" name="id" value={counter.id} />
                                        <button>Delete</button>
                                    </Form>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}