import { useRouteLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import CustomTable from '../../components/UI/CustomTable';
import CustomLink from "../../components/UI/CustomLink";
import NoOpenCustomLink from "../../components/UI/NoOpenCustomLink";
import MyBetsPieChart from "../../components/UI/Charts/MyBetsPieChart";
import { generateRGBAColors } from "../../util/chart";

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
        let betPlayers = [...bet.teamA, ...bet.teamB].filter(x=>x._id !== player._id);
        for (let x = 0; x < betPlayers.length; x++) {
            const aPlayer = betPlayers[x];
            const isTeamMate = bet.teamA.includes(aPlayer);
            const playerKey = aPlayer.display_name;
            
            const existingStat = chartTeamStats.find(stat => stat.key === playerKey);
            
            if (!existingStat) {
              chartTeamStats.push({
                key: playerKey,
                total: 1,
                isTeamMate
              });
            } else {
              existingStat.total += 1;
            }
        }

    }

    let teamMates = [...chartTeamStats].filter(x=>x.isTeamMate)
    let notTeamMate = [...chartTeamStats].filter(x=>!x.isTeamMate)

    let playerDetailsClass = "md:w-1/2";
    if (chartData.length <= 0) {
        playerDetailsClass = "md:w-full"
    }
    return (
        <section className="w-full max-w-[calc(100%-30em)] mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <div className={playerDetailsClass}>
                    <div className="w-1/2 mx-auto py-2 px-2">
                        <h1 className="text-xl font-bold mb-2">Player Details</h1>
                        <p>
                            {player.discord_handle}
                        </p>
                        <p>
                            {player.display_name}
                        </p>
                    </div>
                </div>
                {chartData.length > 0 && (
                    <div className="md:w-1/2">
                        <div>
                            <MyBetsPieChart
                            label={"Bet status"}
                                data={chartData}
                                colors={generateRGBAColors(chartData.length)}
                            />
                        </div>
                    </div>
                )}
                {teamMates.length > 0 && (
                    <div className="md:w-1/2">
                        <div>
                            <MyBetsPieChart
                            label={"Teammates"}
                                data={teamMates}
                                colors={generateRGBAColors(teamMates.length)}
                            />
                        </div>
                    </div>
                )}
                {notTeamMate.length > 0 && (
                    <div className="md:w-1/2">
                        <div>
                            <MyBetsPieChart
                            label={"Enemies"}
                                data={notTeamMate}
                                colors={generateRGBAColors(notTeamMate.length)}
                            />
                        </div>
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