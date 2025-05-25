import { useRouteLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import CustomTable from '../../components/UI/CustomTable';
import CustomLink from "../../components/UI/CustomLink";
import NoOpenCustomLink from "../../components/UI/NoOpenCustomLink";
import MyBetsPieChart from "../../components/UI/Charts/MyBetsPieChart";
import { generateRGBAColors } from "../../util/chart";
import clsx from "clsx";

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
            (bet.winner === "teamA" && bet.teamA.some((team) => team.toString() === player._id.toString()))
            ||
            (bet.winner === "teamB" && bet.teamB.some((team) => team.toString() === player._id.toString()))
        )
            return 'WIN'

        return 'LOSS';
    }

    let chartData = []
    let chartTeamStats = []
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
        let betPlayers = [...bet.teamA, ...bet.teamB].filter(x => x._id !== player._id);
        for (let x = 0; x < betPlayers.length; x++) {
            const aPlayer = betPlayers[x];
            const isTeamMate = bet.teamA.includes(aPlayer);
            const playerKey = aPlayer.display_name;

            const existingStat = chartTeamStats.find(stat => stat.key === playerKey);

            if (!existingStat) {
                chartTeamStats.push({
                    key: playerKey,
                    isTeamMate: (isTeamMate ? 1 : 0),
                    isEnemy: (!isTeamMate ? 1 : 0)
                });
            } else {
                existingStat.isTeamMate += (isTeamMate ? 1 : 0);
                existingStat.isEnemy += (!isTeamMate ? 1 : 0);
            }
        }

    }

    let teamMates = [...chartTeamStats].filter(x => x.isTeamMate > 0)
    let notTeamMate = [...chartTeamStats].filter(x => x.isEnemy > 0)

    let playerDetailsClass = "md:w-1/2";
    if (chartData.length <= 0) {
        playerDetailsClass = "md:w-full"
    }

    let itemCount = 1;
    if (chartData.length > 0) itemCount++;
    if (teamMates.length > 0) itemCount++;
    if (notTeamMate.length > 0) itemCount++;

    const gridCols = clsx(
        'grid-cols-1 sm:grid-cols-2',
        itemCount >= 4 ? 'lg:grid-cols-4' : `lg:grid-cols-${itemCount}`
    );

    return (
        <section className="h-screen flex flex-col overflow-y-auto px-4 lg:px-[12vw] dark:border-gray-700 dark:bg-gray-800">
            <div
                className={clsx(
                    'flex-1 items-center grid gap-2 p-2 overflow-y-auto min-h-[65vh] sm:max-h-full',
                    gridCols
                )}>
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="w-full md:w-1/2 mx-auto py-2 px-2 text-blue-900 self-start">
                            <h1 className="text-xl font-bold mb-2">Player Details</h1>
                            <p>{player.discord_handle}</p>
                            <p>{player.display_name}</p>
                        </div>
                    </div>
                </div>
                {chartData.length > 0 && (
                    <div className="p-4">
                        <MyBetsPieChart
                            label="Bet status"
                            data={chartData}
                            colors={generateRGBAColors(chartData.length)}
                        />
                    </div>
                )}
                {teamMates.length > 0 && (
                    <div className="p-4">
                        <MyBetsPieChart
                            label="Teammates"
                            data={teamMates.map((x) => { return { key: x.key, total: x.isTeamMate } })}
                            colors={generateRGBAColors(teamMates.length)}
                        />
                    </div>
                )}
                {notTeamMate.length > 0 && (
                    <div className="p-4">
                        <MyBetsPieChart
                            label="Enemies"
                            data={notTeamMate.map((x) => { return { key: x.key, total: x.isEnemy } })}
                            colors={generateRGBAColors(notTeamMate.length)}
                        />
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-x-auto p-1 md:p-2 lg:p-4">
                <div className="w-full max-w-screen-lg mx-auto">
                    {bets && bets.length > 0 && (
                        <CustomTable
                            prefix="bets"
                            primaryColumn="status"
                            isAsc={true}
                            data={bets.map((bet) => ({
                                _id: bet._id,
                                title: bet.title,
                                status: bet.status,
                                verdict: getVerdict(bet),
                                link: bet.link
                            }))}
                            columns={[
                                { column_name: "Title", column: "title", element: CustomLink },
                                { column_name: "Status", column: "status" },
                                { column_name: "Verdict", column: "verdict" },
                                { column_name: "Link", column: "link", element: NoOpenCustomLink }
                            ]}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export async function loader({ params }) {
    return useGetFetch("players/" + params.id);
}