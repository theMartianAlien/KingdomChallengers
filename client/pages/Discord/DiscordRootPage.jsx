import { Outlet } from "react-router-dom";
import Content from "../../components/Layout/Content";
export default function DiscordRootPage() {
    return (
        <>
            <Content>
                <Outlet />
            </Content>
        </>
    );
}