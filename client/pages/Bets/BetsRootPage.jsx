import { Outlet } from "react-router-dom";

export default function BetsRootPage() {
    return (
        <>
            <section className="flex flex-col items-center justify-center min-h-32 p-5">
                <Outlet />
            </section>
        </>
    );
}