import { Link, redirect, useLoaderData, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from './PlayersList.module.css';
import { useDeleteFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function PlayersList() {
    const players = useLoaderData();
    const submit = useSubmit();
    const { adminToken } = useRouteLoaderData('root');

    function startDeleteHandler(id) {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            const formData = new FormData();
            formData.append("id", id);
            submit(formData, { method: 'delete', });
        }
    }

    return (
        <div className={classes.center}>
            <table>
                <thead>
                    <tr className={classes.header}>
                        <th className={classes["name-col"]}>Discord handler</th>
                        <th className={classes["name-col"]}>Display name</th>
                        {adminToken && (<th className={classes.col}>Edit</th>)}
                        {adminToken && (<th className={classes.col}>Delete</th>)}

                    </tr>
                </thead>
                <tbody>
                    {
                        players.map(
                            (player) => (
                                <tr key={player._id} className={classes.rowcontent}>
                                    <td className={classes["name-col"]}>
                                        {player.handler}
                                    </td>
                                    <td className={classes["name-col"]}>
                                        {player.display_name}
                                    </td>
                                    {adminToken && (<td className={classes.col}>
                                        <Link to={`/players/${player._id}/edit`}>
                                            Edit
                                        </Link>
                                    </td>)}
                                    {adminToken && (<td  className={classes.col}>
                                        <button
                                            onClick={() => startDeleteHandler(player._id)}>
                                            Delete
                                        </button>
                                    </td>)}
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();
    const id = data.get('id');

    const admin = getAdminToken();
    const resData = await useDeleteFetch("players/" + id, admin);
    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }
    return redirect('/players');
}