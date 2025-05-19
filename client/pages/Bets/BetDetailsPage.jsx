import { Link, useRouteLoaderData } from "react-router-dom";
import classes from './BetDetailsPage.module.css';
import Bet from "../../components/Bets/Bet";
import { useGetFetch } from "../../hooks/useFetch";

export default function BetDetailPage() {
    const { bet } = useRouteLoaderData('bet-detail');
    const { adminToken } = useRouteLoaderData('root');
    return (
        <>
            <Bet bet={bet} />
            <div>
                {adminToken && (
                    <Link to={`edit`} relative='path' className={classes.actions}>Edit Bet</Link>
                )}
                <Link to=".." relative='path' className={classes.actions}>Back</Link>
            </div>
        </>
    );
}

export async function loader({ request, params }) {
    return await useGetFetch("bets/" + params.id)
}