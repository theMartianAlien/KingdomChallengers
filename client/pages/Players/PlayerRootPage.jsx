import { Outlet } from "react-router-dom";
import PlayersNavigation from "../../components/Players/PlayersNavigation";

export default function PlayersRootPage() {
    return (
        <>
            {/* <PlayersNavigation /> */}
            <section>
                <Outlet />
            </section>
        </>
    );
}