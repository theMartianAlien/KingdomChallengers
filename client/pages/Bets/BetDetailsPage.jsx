import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";
import classes from './BetDetailsPage.module.css';
import Bet from "../../components/Bets/Bet";
import { useGetFetch } from "../../hooks/useFetch";

export default function BetsDetailPage() {
    const { bet, players } = useLoaderData();
    // const token = useRouteLoaderData('root');
    return (
        <div className={classes.thebet}>
            <Bet bet={bet} players={players} />
            {/* <div className={classes.actions}>
                {token && (
                    <Link to={`edit`} relative='path' className={classes.actions}>Edit Bet</Link>
                )}
                <Link to=".." relative='path' className={classes.actions}>Back</Link>
            </div> */}
        </div>
    );
}

export async function loader({ request, params }) {
    return await useGetFetch("bets/" + params.id)
}