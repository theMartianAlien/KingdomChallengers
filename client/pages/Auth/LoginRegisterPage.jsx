import { redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { setUserData } from "../../util/auth";

export default function LoginRegisterPage({ isLogin = true }) {
    return (
        <>
            {isLogin && (<LoginForm />)}
            {!isLogin && (<RegistrationForm />)}
        </>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();
    let authData = {
        display_name: data.get('register-username'),
        nickname: data.get('register-username'),
        username: data.get('username') || data.get('register-username'),
        password: data.get('password') || data.get('register-password'),
        "repeat-password": data.get('repeat-password') || data.get('repeat-password'),
        discord_handle: data.get('discord_handle') || data.get('register-discord_handle'),
        user_key: data.get('user_key') ||data.get('register-user_key')
    }
    let endpoint = 'auth/login';
    if (authData.discord_handle && authData.user_key) {
        endpoint = 'auth/register';
    }
    const resData = await usePatchPostFetch(endpoint, request.method, authData);
    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }

    setUserData({...resData});
    return redirect('/');
}