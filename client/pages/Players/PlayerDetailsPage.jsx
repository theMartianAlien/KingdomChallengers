import { useRouteLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import CustomTable from '../../components/UI/CustomTable';
import CustomLink from "../../components/UI/CustomLink";
import NoOpenCustomLink from "../../components/UI/NoOpenCustomLink";
import MyBetsPieChart from "../../components/UI/Charts/MyBetsPieChart";

export default function PlayerDetailsPage() {
    const data = useRouteLoaderData('player-detail');
    let player, bets;
    if (data) {
        if (data.player)
            player = data.player;
        if (data.bets)
            bets = data.bets;
    }
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

    let chartData = []
    for (let i = 0; i < bets.length; i++) {
        const bet = bets[i];
        let exist = chartData.find((x) => x.key === bet.status);
        if (!exist) {
            chartData.push({
                key: bet.status,
                total: 1
            });
        } else {
            chartData.map((obj) => {
                if (obj.key === bet.status) {
                    obj.total = obj.total + 1;
                    return {
                        ...obj
                    }
                }
            })
        }
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
                {chartData.length>0 && (
                    <div>
                        <MyBetsPieChart
                            data={chartData}
                            colors={
                                [
                                    'rgba(34, 197, 94, 1)', // blue
                                    'rgba(239, 68, 68, 1)', // green
                                    'rgba(250, 204, 21, 1)',  // red
                                ]
                            }
                        />
                    </div>
                )}
            </div>
            {bets && bets.length > 0 && (
                <CustomTable
                    prefix={"bets"}
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
                />
            )}
        </section>
    );
}

export async function loader({ params }) {
    return useGetFetch("players/" + params.id);
}