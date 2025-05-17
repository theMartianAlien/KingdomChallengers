import DiscordList from "../../components/Discord/DiscordList";
import { useGetFetch } from "../../hooks/useFetch";

export default function DiscordListPage() {
    return (
        <>
            <DiscordList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("discord");
}