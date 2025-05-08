import { Form, redirect } from "react-router-dom";
import { usePost } from "../../hooks/usePostFetch";

export default function PlayerForm({ method }) {
    return (
        <>
            <div>
                <Form method={method} className='form'>
                    <p className='form-group'>
                        <label htmlFor="handler">Discord Handler</label>
                        <input id="handler" type="text" name="handler" required />
                    </p>
                    <p className='form-group'>
                        <label htmlFor="displayName">Password</label>
                        <input id="display_name" type="text" name="display_name" required />
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
    const playerData = {
        handler,
        display_name
    }

    const resData = await usePost("players", playerData);
    return redirect('/players');
}