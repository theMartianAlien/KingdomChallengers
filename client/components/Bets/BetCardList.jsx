import { Link, useRouteLoaderData } from 'react-router-dom';
import BetCard from './BetCard';
import { sortByProperty } from '../../util/sort';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function BetCardList() {
    const bets = useRouteLoaderData('bets-list');
    const data = useRouteLoaderData('bets-root');
    const [filteredBets, setFilteredBets] = useState(bets);

    const filters = useSelector(state => state.betsFilter.filtersBy);
    const searchTerm = useSelector(state => state.betsFilter.term);
    const status = useSelector(state => state.betsFilter.status);
    const sortBy = useSelector(state => state.betsFilter.sortBy);

    useEffect(() => {
        const hasFilters = filters?.length > 0;
        const hasSearchTerm = searchTerm?.length > 0;
        const hasStatus = status?.length > 0;
        const toSort = sortBy?.sort || sortBy?.order;

        const matchesFilter = (bet) =>
            bet.teamA.some(team => filters.includes(team._id)) ||
            bet.teamB.some(team => filters.includes(team._id));

        const matchesSearch = (bet) =>
            bet.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = (bet) =>
            bet.status === status;

        let result = bets.filter(bet => {
            const filterMatch = !hasFilters || matchesFilter(bet);
            const searchMatch = !hasSearchTerm || matchesSearch(bet);
            const statusMatch = !hasStatus || matchesStatus(bet);
            return filterMatch && searchMatch && statusMatch;
        });

        const sortedResult = toSort
            ? sortByProperty([...result], sortBy.sort, sortBy.order === 'asc')
            : result;
        setFilteredBets(sortedResult);
    }, [filters, searchTerm, status, sortBy]);

    const columnsStyle = `grid gap-1 md:gap-3 grid-cols-1 
  ${filteredBets.length === 2 ? 'md:grid-cols-2 justify-center' : ''}
  ${filteredBets.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}
`;

    return (
        <>
            <p className='text-lg'>Total bets: <span className='text-blue-400'>{filteredBets.length}</span></p>
            <div className={columnsStyle}>
                {filteredBets.map((bet) => (
                    <div key={bet._id} className="rounded">
                        <Link to={`/bets/${bet._id}`}>
                            <BetCard bet={bet} data={data} />
                        </Link>
                    </div>))}
            </div>
        </>
    );
}