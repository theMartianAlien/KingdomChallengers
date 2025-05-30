import { redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useDeleteFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";
import CustomTable from "../UI/CustomTable";
import UnderlinedLink from "../UI/Links/UnderlinedLink";
import ActionDeleteButton from "../UI/Buttons/ActionDeleteButton";

export default function PlayersList() {
    const players = useLoaderData();
    const { adminToken } = useRouteLoaderData('root');
    let column = [
        {
            "column_name": "Discord Handler",
            "column": "discord_handle",
            className: "font-medium text-blue-600 underline dark:text-blue-500 hover:uppercase",
            isClean: true,
            element: UnderlinedLink
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
            className: "font-medium text-blue-600 underline dark:text-blue-500 hover:uppercase",
            isClean: true,
            element: UnderlinedLink
        })
        column.push({
            "column_name": "",
            "column": "delete",
            "label" : "Delete",
            element: ActionDeleteButton
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
                            edit: player._id + "/edit",
                            delete: player._id
                        }
                    })
                }
            />
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