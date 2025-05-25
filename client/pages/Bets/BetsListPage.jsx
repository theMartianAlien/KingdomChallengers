import BetsList from '../../components/Bets/BetsList'
import { useGetFetch } from '../../hooks/useFetch';

export default function BetsListPage() {

    return (
        <>
            <BetsList />
        </>
    );
}

export async function loader() {
    return await useGetFetch("bets");
}