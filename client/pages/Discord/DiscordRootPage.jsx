import { Outlet } from "react-router-dom";
export default function DiscordRootPage() {
    return (
        <>
            <h1>
                Discord Root Page
            </h1>
            <section>
                <Outlet />
            </section>
        </>
    );
}