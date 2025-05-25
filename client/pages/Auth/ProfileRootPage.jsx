import { Outlet } from "react-router-dom";
import Content from "../../components/Layout/Content";

export default function ProfileRootPage() {
    return (
        <>
            <Content>
                <Outlet />
            </Content>
        </>
    );
}