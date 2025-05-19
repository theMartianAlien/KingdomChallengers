import ProfileForm from "../../components/Auth/ProfileForm";
import { useGetFetch } from "../../hooks/useFetch";
import { getAccountId } from "../../util/auth";

export default function EditProfilePage() {
    return (
        <p>Page under construction</p>
        // <ProfileForm />
    );
}

export async function loader({ request, params }) {
    const accountId = getAccountId();
    return await useGetFetch("auth/" + accountId);
}