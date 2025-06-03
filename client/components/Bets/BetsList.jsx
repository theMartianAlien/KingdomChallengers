import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BetCardList from './BetCardList';

export default function BetsList() {
    const bets = useLoaderData();
    const data = useRouteLoaderData('bets-root');
    // const ongoing = bets.filter((bet) => { return (bet.status === 'ongoing') });
    // const complete = bets.filter((bet) => { return (bet.status === 'complete') });
    // const voidBets = bets.filter((bet) => { return (bet.status === 'void') });
    return (
        <>
            <h1 className="uppercase">Players List</h1>
            <div className="flex flex-col items-center justify-center text-center">
                <h1>List of all current {bets.length} bets</h1>
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* <div className="flex-1"> */}
                        <BetCardList bets={bets} data={data} /> 
                        {/* </div> */}
                    {/* <div className="flex-1"><BetCardList bets={complete} data={data} /> </div>
                    <div className="flex-1"><BetCardList bets={voidBets} data={data} /> </div> */}
                </div>
            </div>
        </>
    );
}