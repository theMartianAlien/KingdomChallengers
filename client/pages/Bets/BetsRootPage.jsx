import { Outlet } from "react-router-dom";
import Content from "../../components/Layout/Content";
import { useSelector } from "react-redux";
import BetsNavigation from "../../components/Bets/BetsNavigation";

export default function BetsRootPage() {
    return (
        <>
            <BetsNavigation />
            <Content>
                <Outlet />
            </Content>
        </>
    );
}