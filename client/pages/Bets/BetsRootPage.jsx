import { Outlet } from "react-router-dom";
import Content from "../../components/Layout/Content";

export default function BetsRootPage() {
    return (
        <>
            <Content className="">
                <Outlet />
            </Content>
        </>
    );
}