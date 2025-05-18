import { Link, redirect, useLoaderData, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useDeleteFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";
import CustomTable from "../UI/CustomTable";
import CustomLink from "../UI/CustomLink";
import DeleteButton from "../UI/Buttons/DeleteButton";

export default function PlayersList() {
    const players = useLoaderData();
    const submit = useSubmit();
    const { adminToken } = useRouteLoaderData('root');
    function startDeleteHandler(id) {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            const formData = new FormData();
            formData.append("id", id);
            submit(formData, { method: 'delete' });
        }
    }

    let column = [
        {
            "column_name": "Discord Handler",
            "column": "discord_handle",
            element: CustomLink
        },
        {
            "column_name": "Display Namer",
            "column": "display_name"
        }
    ]
    if (adminToken) {
        column.push({
            "column_name": "",
            "column": "edit",
            "label" : "Edit",
            element: CustomLink
        })
        column.push({
            "column_name": "",
            "column": "delete",
            "label" : "Delete",
            element: DeleteButton
        })
    }

    return (
        <div>
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-4 uppercase">Players List</h2>
            <CustomTable
                prefix={"players"}
                primaryColumn={"display_name"}
                isAsc={true}
                columns={column}
                data={
                    players.map((player) => {
                        return {
                            _id: player._id,
                            discord_handle: player.discord_handle,
                            display_name: player.display_name,
                            edit: "players/" + player._id + "/edit",
                            delete: player._id
                        }
                    })
                }
            />
            {/* <div className="overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {
                            players.map(
                                (player) => (
                                    <tr key={player._id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {player.discord_handle}
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
            </div> */}
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