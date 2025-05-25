import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import MainNavigation from "../../components/Layout/MainNavigation";

export default function RootPage() {
    const token = useLoaderData();
    const submit = useSubmit();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        if (!token || hasLoggedOut.current) return;

        if (token === 'EXPIRED') {
            hasLoggedOut.current = true;
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

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