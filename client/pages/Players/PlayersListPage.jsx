import PlayersList from "../../components/Players/PlayersList";
import { useGetFetch } from "../../hooks/useFetch";
import { queryClient } from "../../util/http";

export default function PlayersListPage() {
    return (
        <PlayersList />
    );
}

export async function loader() {
    return queryClient.fetchQuery({
        queryKey: ['players'],
        queryFn: () => useGetFetch('players'),
    });
}