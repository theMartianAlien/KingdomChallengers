import PlayersList from "../../components/Players/PlayersList";
import { useGetFetch } from "../../hooks/useFetch";

export default function PlayersListPage() {
    return (
        <>
            <h1>Players List</h1>
            <PlayersList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("players");
}