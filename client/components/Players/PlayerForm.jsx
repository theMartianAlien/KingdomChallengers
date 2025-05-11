import { Form, redirect, useActionData, useRouteLoaderData } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function PlayerForm({ method, player }) {
    const data = useActionData();
    return (
        <>
            <div>
                <Form method={method} className='form'>
                    {data && (
                        <p>
                            <span>{data.message}</span>
                        </p>)}
                    <p className='form-group'>
                        <label htmlFor="handler">Discord Handler</label>
                        <input id="handler" type="text" name="handler" defaultValue={(player?.handler ?? '')} required readOnly={method === 'patch'} />
                    </p>
                    <p className='form-group'>
                        <label htmlFor="handler">Display Name</label>
                        <input id="display_name" type="text" name="display_name" defaultValue={(player?.display_name ?? '')} required />
                    </p>
                    <p className='form-group'>
                        <button>Save Player</button>
                    </p>
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