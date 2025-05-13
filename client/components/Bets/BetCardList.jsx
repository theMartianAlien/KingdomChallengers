import { Link } from 'react-router-dom';
import BetCard from './BetCard';

export default function BetCardList({ bets, data }) {
    return (
        <>
            <ul className="mt-4 flex flex-col gap-4">
                {bets.map((bet) => (
                    <li key={bet._id}>
                        <Link to={`/bets/${bet._id}`}>
                            <BetCard bet={bet} data={data}/>
                        </Link>
                    </li>))}
            </ul>
        </>
    );
}