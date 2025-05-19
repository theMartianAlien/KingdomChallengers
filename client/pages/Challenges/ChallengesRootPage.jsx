import { Outlet } from "react-router-dom";
import ChallengesNavigation from "../../components/Challenges/ChallengesNavigation";

export default function ChallengesRootPage() {
    return (
        <>
            <ChallengesNavigation />
            <section>
                <Outlet />
            </section>
        </>
    );
}