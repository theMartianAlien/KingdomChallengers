import { Form, redirect, useActionData, useRouteLoaderData } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function PlayerForm({ method, player }) {
    console.log(player?.handler ?? '');
    const data = useActionData();
    return (
        <>
            <div>
                <Form method={method} className="max-w-md mx-auto">
                    {data && (
                        <p>
                            <span>{data.message}</span>
                        </p>)}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="handler" id="handler" className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue={(player?.handler ?? '')} required readOnly={method === 'patch'} />
                        <label htmlFor="handler" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discord Handler</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="display_name" id="display_name" className="text-center block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " defaultValue={(player?.display_name ?? '')} required />
                        <label htmlFor="display_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Display Name</label>
                    </div>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Player</button>
                </Form>
            </div>
        </>
    );
}

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();
    const handler = data.get('handler');
    const display_name = data.get('display_name');
    let playerData = {
        _id: params.id,
        handler,
        display_name
    }
    if (method === 'POST') {
        playerData.handler = handler;
    }
    const admin = getAdminToken();
    const resData = await usePatchPostFetch("players", method, playerData, admin);
    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }
    return redirect('/players');
}