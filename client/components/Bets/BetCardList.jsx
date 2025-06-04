import { Link } from 'react-router-dom';
import BetCard from './BetCard';
import { sortByProperty } from '../../util/sort';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function BetCardList({ bets, data }) {

    const [filteredBets, setFilteredBets] = useState(bets);

    const filters = useSelector(state => state.betsFilter.filtersBy);
    const searchTerm = useSelector(state => state.betsFilter.term);
    const status = useSelector(state => state.betsFilter.status);

    useEffect(() => {
        const hasFilters = filters?.length > 0;
        const hasSearchTerm = searchTerm?.length > 0;
        const hasStatus = status?.length > 0;

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

        setFilteredBets(result);
    }, [filters, searchTerm, status]);

    const columnsStyle = `
    grid gap-4
    ${filteredBets.length === 1 ? 'justify-center grid-cols-1' : ''}
    ${filteredBets.length === 2 ? 'justify-center grid-cols-2' : ''}
    ${filteredBets.length > 2 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
  `;

    return (
        <>
            <div className='flex justify-center flex-col'>
                <p className='text-lg'>Total bets: <span className='text-blue-400'>{filteredBets.length}</span></p>
                <div className={columnsStyle}>
                    {sortByProperty(filteredBets, "date_created", false).map((bet) => (
                        <div key={bet._id}>
                            <Link to={`/bets/${bet._id}`}>
                                <BetCard bet={bet} data={data} />
                            </Link>
                        </div>))}
                </div>
            </div>
        </>
    );
}