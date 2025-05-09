import BetsList from '../../components/Bets/BetsList'
import { useGetFetch } from '../../hooks/useFetch';

export default function BetsListPage() {

    return (
        <>
            <h1>List of Bets</h1>
            <BetsList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("bets");
}