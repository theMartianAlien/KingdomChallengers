import ProfileForm from "../../components/Auth/ProfileForm";
import { useGetFetch, usePatchPostFetch } from "../../hooks/useFetch";
import { getAccountId, getAuthToken, setUserData } from "../../util/auth";

export default function EditProfilePage() {
    return (
        <>
            <ProfileForm />
        </>
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

export async function action({ request, params }) {
    const _id = getAccountId();
    const method = request.method;
    const data = await request.formData();
    const discord_handle = data.get('discord_handle');
    const display_name = data.get('display_name');
    const nickname = data.get('nickname');
    const username = data.get('username');
    const user_avatar = data.get('user_avatar');
    const password = data.get('password');
    const repeat_password = data.get('repeat-password');
    let profileData = {
        _id,
        discord_handle,
        display_name,
        nickname,
        username,
        image: user_avatar,
        password,
        repeat_password
    }
    const token = getAuthToken();
    const resData = await usePatchPostFetch("auth", method, profileData, token)
    if (resData && resData.account) {
        setUserData({ ...resData.account })
    }
    return resData;
}