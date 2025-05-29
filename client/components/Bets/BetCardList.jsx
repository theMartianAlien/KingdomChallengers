import { Link } from 'react-router-dom';
import BetCard from './BetCard';
import { sortByProperty } from '../../util/sort';

export default function BetCardList({ bets, data }) {
    return (
        <>
            <p className='text-lg'>Total bets: <span className='text-blue-400'>{bets.length}</span></p>
            <ul className="mt-4 flex flex-col gap-4">
                {sortByProperty(bets, "date_created", false).map((bet) => (
                    <li key={bet._id}>
                        <Link to={`/bets/${bet._id}`}>
                            <BetCard bet={bet} data={data}/>
                        </Link>
                    </li>))}
            </ul>
        </>
    );
}