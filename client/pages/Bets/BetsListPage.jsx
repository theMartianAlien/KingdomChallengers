import BetsFilter from '../../components/Bets/BetsFilter';
import { useGetFetch } from '../../hooks/useFetch';
import BetCardList from '../../components/Bets/BetCardList';
import { queryClient } from '../../util/http';


export default function BetsListPage() {
    return (
        <div>
            <BetsFilter />
            <div className="flex flex-col items-center justify-center text-center">
                <BetCardList />
            </div>
        </div>
    );
}

export async function loader() {
    return queryClient.fetchQuery({
        queryKey: ['bets'],
        queryFn: () => useGetFetch('bets'),
    });
}