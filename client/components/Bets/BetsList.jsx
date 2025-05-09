import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import classes from './BetsList.module.css';
import BetCardList from './BetCardList';

export default function BetsList() {
    const bets = useLoaderData();
    const data = useRouteLoaderData('bets-root');
    const ongoing = bets.filter((bet) => { return (bet.status === 'ongoing') });
    const complete = bets.filter((bet) => { return (bet.status === 'complete') });
    const voidBets = bets.filter((bet) => { return (bet.status === 'void') });
    return (
        <>
            <div className={classes.bets}>
                <h1>List of all current {bets.length} bets</h1>
                <div>
                    <BetCardList bets={ongoing} data={data} />
                    <BetCardList bets={complete} data={data} />
                    <BetCardList bets={voidBets} data={data} />
                </div>
            </div>
        </>
    );
}