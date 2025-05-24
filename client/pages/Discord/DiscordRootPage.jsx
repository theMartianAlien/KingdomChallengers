import { Outlet } from "react-router-dom";
export default function DiscordRootPage() {
    return (
        <>
            <section>
                <Outlet />
            </section>
        </>
    );
}