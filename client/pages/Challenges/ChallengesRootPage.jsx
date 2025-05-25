import { Outlet } from "react-router-dom";
import ChallengesNavigation from "../../components/Challenges/ChallengesNavigation";
import Content from "../../components/Layout/Content";

export default function ChallengesRootPage() {
    return (
        <>
            <ChallengesNavigation />
            <Content className="">
                <Outlet />
            </Content>
        </>
    );
}