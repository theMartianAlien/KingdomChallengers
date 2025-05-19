import ProfileForm from "../../components/Auth/ProfileForm";
import { useGetFetch } from "../../hooks/useFetch";
import { getAccountId, getAuthToken } from "../../util/auth";

export default function EditProfilePage() {
    return (
        <p>Page under construction</p>
        // <ProfileForm />
    );
}

export async function loader({ request, params }) {
    const token = getAuthToken();
    if (!token) {
        return redirect('/login');
    }
    const accountId = getAccountId();
    return await useGetFetch("auth/" + accountId);
}