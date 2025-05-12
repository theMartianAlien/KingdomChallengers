import { Outlet } from "react-router-dom";
import classes from './ChallengesRootPage.module.css';
import ChallengesNavigation from "../../components/Challenges/ChallengesNavigation";

export default function ChallengesRootPage() {
    return (
        <>
            <ChallengesNavigation />
            <section className={classes["main-content"]}>
                <Outlet />
            </section>
        </>
    );
}