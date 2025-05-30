import { Form, redirect, useActionData, useRouteLoaderData } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";
import InputField from "../UI/Fields/InputField";

export default function PlayerForm({ method }) {
    const data = useActionData();
    const { player } = useRouteLoaderData('player-detail');
    return (
        <>
            <div>
                <Form method={method} className="max-w-md mx-auto">
                    {data && (
                        <p>
                            <span>{data.message}</span>
                        </p>)}
                    <InputField
                        label="Discord handle"
                        elementName="discord_handle"
                        inputClass="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        labelClass="block mb-2 text-sm font-medium text-white dark:text-gray-300 text-sm text-white"
                        defaultValue={(player?.discord_handle ?? '')}
                        required
                        readOnly={method === 'patch'}
                    />
                    <InputField
                        label="Display Name"
                        elementName="display_name"
                        inputClass="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        labelClass="block mb-2 text-sm font-medium text-white dark:text-gray-300 text-sm text-white"
                        defaultValue={(player?.display_name ?? '')}
                        required
                    />
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Player</button>
                </Form>
            </div>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const discord_handle = data.get('discord_handle');
    const display_name = data.get('display_name');
    let playerData = {
        _id: params.id,
        discord_handle,
        display_name
    }
    if (method === 'POST') {
        playerData.discord_handle = discord_handle;
    }
    const admin = getAdminToken();
    const resData = await usePatchPostFetch("players", method, playerData, admin);
    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }

    return redirect('/players');
}