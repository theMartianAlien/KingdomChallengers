import { Link } from 'react-router-dom';
import BetCard from './BetCard';
import { sortByProperty } from '../../util/sort';

export default function BetCardList({ bets, data }) {
    return (
        <>
            <div className='flex justify-center flex-col'>
                <p className='text-lg'>Total bets: <span className='text-blue-400'>{bets.length}</span></p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortByProperty(bets, "date_created", false).map((bet) => (
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