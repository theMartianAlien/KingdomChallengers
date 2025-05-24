import { redirect, useLoaderData } from "react-router-dom";
import CustomTable from "../UI/CustomTable";
import CustomLink from "../UI/CustomLink";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { useDeleteFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function DiscordList() {
    const discordUsers = useLoaderData();

    let columns = [
        {
            "column_name": "Discord Handler",
            "column": "discord_handle",
            element: CustomLink
        },
        {
            "column_name": "",
            "column": "edit",
            "label": "Edit",
            element: CustomLink
        },
        {
            "column_name": "",
            "column": "delete",
            "label": "Delete",
            "suffix": 'delete',
            element: DeleteButton
        }
    ]

    return (
        <>
            <div>
                <h2 className="text-center text-lg font-semibold text-gray-700 mb-4 uppercase">Discord Users List</h2>
                <CustomTable
                    prefix={"discord"}
                    primaryColumn={"discord_handle"}
                    isAsc={true}
                    columns={columns}
                    data={
                        discordUsers.map((user) => {
                            return {
                                _id: user._id,
                                discord_handle: user.discord_handle,
                                edit: "discord/" + user._id + "/edit",
                                delete: user._id
                            }
                        })
                    }
                />
            </div>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const adminToken = getAdminToken();
    if (method === 'DELETE') {
        const resData = await useDeleteFetch(`discord/${params.id}`, adminToken);
        if (resData.status === 422 || resData.status === 401 || resData.status === 404) {
            return resData;
        }

        return redirect("/discord");
    }
}