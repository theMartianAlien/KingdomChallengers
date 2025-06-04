import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BetCardList from './BetCardList';

export default function BetsList() {
    const bets = useLoaderData();
    const data = useRouteLoaderData('bets-root');

    return (
        <>
            <div className="flex flex-col items-center justify-center text-center">
                <BetCardList bets={bets} data={data} />
            </div>
        </>
    );
}