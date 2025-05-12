import PlayersList from "../../components/Players/PlayersList";
import { useGetFetch } from "../../hooks/useFetch";

export default function PlayersListPage() {
    return (
        <>
            <h1 className="uppercase">Players List</h1>
            <PlayersList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("players");
}