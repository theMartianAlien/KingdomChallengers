import DiscordList from "../../components/Discord/DiscordList";
import { useGetFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function DiscordListPage() {
    return (
        <>
            <DiscordList />
        </>
    );
}

export async function loader() {
    const adminToken = getAdminToken();
    return await useGetFetch("discord", adminToken);
}