import { Link } from 'react-router-dom';
import classes from './BetsList.module.css';
import images from '../../util/IMAGES';
import { Card } from 'flowbite-react';

export default function BetCardList({ bets, data }) {
    return (
        <>
            <ul className="mt-4 flex flex-col gap-4">
                {bets.map((bet) => (
                    <li key={bet._id}>
                        <Link to={`/bets/${bet._id}`}>
                            <Card className="max-w-sm" imgSrc={`${images[bet.status === 'ongoing' ?
                                bet.status : bet.status === 'complete' ?
                                    'complete' : 'void'].link}.jpg`} imgAlt={bet.title}>
                                <h5 className={`text-2xl font-bold tracking-tight ${classes.title}`}>
                                    {bet.title}
                                </h5>

                                <h4 className={`text-sm font-medium mt-1 ${classes.subtitle}`}>
                                    Status: <span className={classes.status}>{bet.status}</span>
                                </h4>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {data.filter((p) => bet.teamA.includes(p._id)).map((p) => (p.display_name)).join(", ")}
                                    &nbsp;VS&nbsp;
                                    {data.filter((p) => bet.teamB.includes(p._id)).map((p) => (p.display_name)).join(", ")}
                                </p>
                            </Card>
                        </Link>
                    </li>))}
            </ul>
        </>
    );
}