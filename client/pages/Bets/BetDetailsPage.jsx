import Bet from "../../components/Bets/Bet";
import { useGetFetch } from "../../hooks/useFetch";

export default function BetDetailPage() {
    return (
        <>
            <Bet />
        </>
    );
}

export async function loader({ request, params }) {
    return await useGetFetch("bets/" + params.id)
}