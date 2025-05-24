import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { useEffect, useRef } from "react";
import MainNavigation from "../../components/MainNavigation";
import { getTokenDuration } from "../../util/auth";

export default function RootPage() {
    const token = useLoaderData();
    const submit = useSubmit();
    const hasLoggedOut = useRef(false); // ✅ Prevent repeated logouts
  
    useEffect(() => {
        if (!token || hasLoggedOut.current) return;
      
        if (token === 'EXPIRED') {
          hasLoggedOut.current = true;
          submit(null, { action: '/logout', method: 'post' });
          return;
        }
      
        // Remove the automatic logout timer
        // No timer = no auto logout
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