import { redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { useDeleteFetch } from "../../hooks/useFetch";

export async function action({ request, params }) {
    const token = getAuthToken();

    const resData = await useDeleteFetch("challenges/delete/" + params.id, token);

    return redirect('/challenges');
}