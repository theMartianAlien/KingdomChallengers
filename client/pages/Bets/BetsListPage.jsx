import BetsFilter from '../../components/Bets/BetsFilter';
import { useGetFetch } from '../../hooks/useFetch';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import BetCardList from '../../components/Bets/BetCardList';

export default function BetsListPage() {
    const bets = useLoaderData();
    const data = useRouteLoaderData('bets-root');

    return (
        <>
            <BetsFilter />
            <div className="flex flex-col items-center justify-center text-center">
                <BetCardList bets={bets} data={data} />
            </div>
        </>
    );
}

export async function loader() {
    return await useGetFetch("bets");
}