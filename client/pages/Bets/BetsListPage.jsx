import BetsList from '../../components/Bets/BetsList'
import { useGetFetch } from '../../hooks/useFetch';

export default function BetsListPage() {

    return (
        <>
            <h1 className="uppercase">Players List</h1>
            <BetsList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("bets");
}