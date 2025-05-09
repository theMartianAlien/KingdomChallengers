import { Link, useLoaderData } from 'react-router-dom';
import classes from './HomeStats.module.css'
import { useState } from 'react';

export default function HomeStats() {
    const data = useLoaderData();

    const [sortedBets, SortBetsHandler] = useState(sortByColumn(data, "total", false));
    const [columnSorting, SortColumnHandler] = useState({
        name: 'asc',
        total: 'asc',
        ongoing: 'asc',
        void: 'asc',
        complete: 'asc',
        wins: 'asc',
        loss: 'asc',
    });

    function onSortBets(column) {
        const sorting = columnSorting[column];
        SortColumnHandler(prevState => {
            return {
                ...prevState,
                [column]: (prevState[column] === 'asc' ? 'desc' : 'asc')
            }
        });
        const sorted = sortByColumn(data, column, sorting === 'asc')
        SortBetsHandler(sorted);
    }

    function sortByColumn(arr, column, ascending = true) {
        return [...arr].sort((a, b) => {
            const valueA = a[column];
            const valueB = b[column];

            if (valueA < valueB) {
                return ascending ? -1 : 1;
            }
            if (valueA > valueB) {
                return ascending ? 1 : -1;
            }
            return 0;
        });
    }

    return (
        <>
            <div className={classes.maindiv}>
                <div className={classes.statelement}>
                    <div className={classes.playerName}>
                        <button onClick={() => onSortBets("name")} className={classes["button-header"]}>
                            <span>Player name</span>
                        </button>
                    </div>
                    <div className={classes.stats}>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("total")} className={classes["button-header"]}>
                                <span>
                                    Total Bets
                                </span>
                            </button>
                        </div>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("ongoing")} className={classes["button-header"]}>
                                <span>
                                    On Going Bets
                                </span>
                            </button>
                        </div>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("void")} className={classes["button-header"]}>
                                <span>
                                    Void Bets
                                </span>
                            </button>
                        </div>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("complete")} className={classes["button-header"]}>
                                <span>
                                    Completed
                                </span>
                            </button>
                        </div>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("wins")} className={classes["button-header"]}>
                                <span>
                                    Wins
                                </span>
                            </button>
                        </div>
                        <div className={classes.col}>
                            <button onClick={() => onSortBets("losts")} className={classes["button-header"]}>
                                <span>
                                    Loss
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    sortedBets.map((data) =>
                        <div key={data.id} className={classes.statelement}>
                            <div className={classes.playerName}>
                                <Link to={`/players/${data.id}`}>
                                    <span>{data.display_name}</span>
                                </Link>
                            </div>
                            <div className={classes.stats}>
                                <div className={classes.col}>
                                    <span>
                                        {data.total}
                                    </span>
                                </div>
                                <div className={classes.col}>
                                    <span>
                                        {data.ongoing}
                                    </span>
                                </div>
                                <div className={classes.col}>
                                    <span>
                                        {data.void}
                                    </span>
                                </div>
                                <div className={classes.col}>
                                    <span>
                                        {data.complete}
                                    </span>
                                </div>
                                <div className={classes.col}>
                                    <span>
                                        {data.wins}
                                    </span>
                                </div>
                                <div className={classes.col}>
                                    <span>
                                        {data.losts}
                                    </span>
                                </div>
                            </div>
                        </div>)
                }
            </div >
        </>
    );
}