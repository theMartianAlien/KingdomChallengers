import { useRouteLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import CustomTable from '../../components/UI/CustomTable';
import CustomLink from "../../components/UI/CustomLink";
import NoOpenCustomLink from "../../components/UI/NoOpenCustomLink";

export default function PlayerDetailsPage() {
    const data = useRouteLoaderData('player-detail');
    let player, bets;
    if (data) {
        if (data.player)
            player = data.player;
        if (data.bets)
            bets = data.bets;
    }

    const { adminToken } = useRouteLoaderData('root');

    function getVerdict(bet) {
        if (bet.status === 'ongoing')
            return '';
        if (bet.status === 'void')
            return 'LOSS';
        if (
            (bet.winner === "teamA" && bet.teamA.some((team) => team.player_id.toString() === player._id.toString()))
            ||
            (bet.winner === "teamB" && bet.teamB.some((team) => team.player_id.toString() === player._id.toString()))
        )
            return 'WIN'

        return 'LOSS';
    }

    return (
        <section>
            <div>
                <h1>Player Details</h1>
                <p>
                    {player.handler}
                </p>
                <p>
                    {player.display_name}
                </p>
            </div>
            {bets && bets.length > 0 && (
                <CustomTable
                    prefix={"/bets/"}
                    primaryColumn="status"
                    isAsc={true}
                    data={
                        bets.map((bet) => {
                            return {
                                _id: bet._id,
                                title: bet.title,
                                status: bet.status,
                                verdict: getVerdict(bet),
                                link: bet.link
                            }
                        })}
                    columns={[
                        {
                            "column_name": "Title",
                            "column": "title",
                            element: CustomLink
                        },
                        {
                            "column_name": "Status",
                            "column": "status"
                        },
                        {
                            "column_name": "Verdict",
                            "column": "verdict"
                        },
                        {
                            "column_name": "Link",
                            "column": "link",
                            element: NoOpenCustomLink
                        }]}
                    headerStyle="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    rowStyle="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    colSize="px-6 py-3"
                />
            )}
        </section>
    );
}

export async function loader({ params }) {
    return useGetFetch("players/" + params.id);
}