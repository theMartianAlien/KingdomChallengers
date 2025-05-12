import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";
import { getTokenDuration } from "../../util/auth";

export default function RootPage() {
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <MainNavigation />
            <main className="my-5">
                <Outlet />
            </main>
        </>
    );
}