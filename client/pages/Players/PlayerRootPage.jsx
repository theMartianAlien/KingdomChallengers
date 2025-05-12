import { Outlet } from "react-router-dom";
import PlayersNavigation from "../../components/Players/PlayersNavigation";

export default function PlayersRootPage() {
    return (
        <>
            {/* <PlayersNavigation /> */}
            <section className="flex flex-col items-center justify-center min-h-screen p-5">
                <Outlet />
            </section>
        </>
    );
}