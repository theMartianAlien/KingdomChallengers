import { Outlet } from "react-router-dom";
import BetsNavigation from "../../components/Bets/BetsNavigation";
import classes from './BetsRootPage.module.css';

export default function BetsRootPage() {
    return (
        <>
            <BetsNavigation />
            <section className={classes["main-content"]}>
                <Outlet />
            </section>
        </>
    );
}