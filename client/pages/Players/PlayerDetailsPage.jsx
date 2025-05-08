import { useLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import PlayerForm from "../../components/Players/PlayerForm";

export default function PlayerDetailsPage() {
    const { player } = useLoaderData();
    return (
        <div>
            <h1>Player Details</h1>
            <PlayerForm method='patch' />
        </div>
    );
}

export async function loader({ params }) {
    return useGetFetch("players/" + params.id);
}