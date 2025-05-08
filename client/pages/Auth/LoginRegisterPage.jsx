import { redirect, useActionData, useLoaderData } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";
import { usePost } from "../../hooks/usePostFetch";
import RegistrationForm from "../../components/Auth/RegistrationForm";

export default function LoginRegisterPage({ isLogin = true }) {
    const data = useLoaderData();
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
        username: data.get('username'),
        password: data.get('password'),
        discord_handle: data.get('discord_handle'),
        user_key: data.get('user_key')
    }
    let endpoint = 'auth/login';
    if (authData.discord_handle && authData.user_key) {
        endpoint = 'auth/register';
    }
    const resData = await usePost(endpoint, authData);
    if (!resData.token && !resData.userId) {
        return redirect('/login', resData);
    }
    localStorage.setItem('token', resData.token);
    localStorage.setItem('userId', resData.id);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
}