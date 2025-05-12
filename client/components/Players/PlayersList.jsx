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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Discord Handler
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Display name
                        </th>
                        {adminToken && (
                            <th scope="col" className="px-6 py-3">

                            </th>
                        )}
                        {adminToken && (
                            <th scope="col" className="px-6 py-3">

                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map(
                            (player) => (
                                <tr key={player._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {player.handler}
                                    </th>
                                    <td className="px-6 py-4">
                                        {player.display_name}
                                    </td>
                                    {adminToken && (
                                        <td className="px-6 py-4">
                                            <Link to={`/players/${player._id}/edit`}>
                                                Edit
                                            </Link>
                                        </td>)}
                                    {adminToken && (
                                        <td className="px-6 py-4">
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