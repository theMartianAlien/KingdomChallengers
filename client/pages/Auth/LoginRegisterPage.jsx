import { redirect } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import { usePatchPostFetch } from "../../hooks/useFetch";

export default function LoginRegisterPage({ isLogin = true }) {
    let form = <RegistrationForm />;
    if (isLogin) {
        form = <LoginForm />
    }
    return (
        <>
            {form}
        </>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();
    let authData = {
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
    const expiration = new Date();
    let expirationTime = expiration.getHours() + 1;
    if (resData.adminToken) {
        localStorage.setItem('admin', resData.adminToken);
        expirationTime = expiration.getHours() + 12;
    }
    expiration.setHours(expirationTime);
    localStorage.setItem('username', resData.username);
    localStorage.setItem('handle', resData.handle);
    localStorage.setItem('id', resData.id);
    localStorage.setItem('player_id', resData.id);
    localStorage.setItem('token', resData.token);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
}