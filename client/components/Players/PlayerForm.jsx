import { Form, redirect, useRouteLoaderData } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function PlayerForm({ method }) {
    const { player } = useRouteLoaderData('player-detail');
    return (
        <>
            <div>
                <Form method={method} className='form'>
                    <p className='form-group'>
                        <label htmlFor="handler">Discord Handler</label>
                        <input id="handler" type="text" name="handler" defaultValue={(player?.handler ?? '')} required readOnly={method === 'patch'}/>
                    </p>
                    <p className='form-group'>
                        <label htmlFor="handler">Discord Handler</label>
                        <input id="handler" type="text" name="handler" defaultValue={(player?.handler ?? '')} required readOnly={method === 'patch'}/>
                    </p>
                    <p className='form-group'>
                        <label htmlFor="displayName">Password</label>
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
        display_name
    }
    if(method === 'POST') {
        playerData.handler = handler;
    }

    const resData = await usePatchPostFetch("players", method, playerData);
    return redirect('/players');
}