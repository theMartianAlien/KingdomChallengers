import { useLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";

export default function PlayerDetailsPage() {
    const { player } = useLoaderData();
    console.log(player);
    return (
        <section>
            <h1>Player Details</h1>
            <p>
                {player.handler}
            </p>
            <p>
                {player.display_name}
            </p>
        </section>
    );
}

export async function loader({ params }) {
    return useGetFetch("players/" + params.id);
}