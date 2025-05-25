import { Outlet } from "react-router-dom";
import Content from "../../components/Layout/Content";

export default function PlayersRootPage() {
    return (
        <>
            <Content className="">
                <Outlet />
            </Content>
        </>
    );
}