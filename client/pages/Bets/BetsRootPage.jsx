import { Outlet } from "react-router-dom";
import BetsNavigation from "../../components/Bets/BetsNavigation";
import classes from './BetsRootPage.module.css';

export default function BetsRootPage() {
    return (
        <>
            {/* <BetsNavigation /> */}
            <section className="flex flex-col items-center justify-center min-h-32 p-5">
                <Outlet />
            </section>
        </>
    );
}