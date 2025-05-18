import { useLoaderData } from "react-router-dom";
import HomeStats from "../components/Statistics/HomeStats";
import MyBetsPieChart from "../components/UI/Charts/MyBetsPieChart";
import { useGetFetch } from "../hooks/useFetch";
import { queryClient } from '../util/http';

export default function HomePage() {
    const data = useLoaderData();
    // console.log(data);
    // let chartData = []
    // for (let i = 0; i < bets.length; i++) {
    //     const bet = bets[i];
    //     let exist = chartData.find((x) => x.key === bet.status);
    //     if (!exist) {
    //         chartData.push({
    //             key: bet.status,
    //             total: 1
    //         });
    //     } else {
    //         chartData.map((obj) => {
    //             if (obj.key === bet.status) {
    //                 obj.total = obj.total + 1;
    //                 return {
    //                     ...obj
    //                 }
    //             }
    //         })
    //     }
    // }

    return (
        <>
            {/* <MyBetsPieChart
                data={chartData}
                colors={
                    [
                        'rgba(34, 197, 94, 1)', // blue
                        'rgba(239, 68, 68, 1)', // green
                        'rgba(250, 204, 21, 1)',  // red
                    ]
                }
            /> */}
            <HomeStats />
        </>
    );
}

export async function loader() {
    return queryClient.fetchQuery({
        queryKey: ['data'],
        queryFn: () => useGetFetch(''),
    });
}