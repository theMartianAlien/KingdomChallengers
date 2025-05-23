import { redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { usePatchPostFetch } from "../../hooks/useFetch";

export async function action({ request, params }) {

    const method = request.method;
    const token = getAuthToken();

    const lockData = {
        _id: params.id
    }

    const resData = await usePatchPostFetch("challenges/lock", method, lockData, token);

    return redirect('/challenges');
}