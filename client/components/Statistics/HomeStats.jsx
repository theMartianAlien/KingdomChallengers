import { Link, useLoaderData } from 'react-router-dom';
import classes from './HomeStats.module.css'
import { useState } from 'react';
import TableHeaderName from '../UI/TableHeaderName';

export default function HomeStats() {
    const data = useLoaderData();
    const [sortedBets, SortBetsHandler] = useState(sortByColumn(data, "total", false));
    const [columnSorting, SortColumnHandler] = useState({
        display_name: 'asc',
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
            let valueA = a[column]
            let valueB = b[column]

            if (column === "display_name") {
                valueA = valueA.toUpperCase();
                valueB = valueB.toUpperCase();
            }

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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <TableHeaderName label="Player name" column="display_name" isAsc={columnSorting["display_name"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="Total Bets" column="total" isAsc={columnSorting["total"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="On Going Bets" column="ongoing" isAsc={columnSorting["ongoing"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="Void" column="void" isAsc={columnSorting["void"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="Complete" column="complete" isAsc={columnSorting["complete"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="Wins" column="wins" isAsc={columnSorting["wins"] === 'asc'} onClickHeader={onSortBets} />
                            <TableHeaderName label="Loss" column="loss" isAsc={columnSorting["loss"] === 'asc'} onClickHeader={onSortBets} />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedBets.map((data) => (
                                <tr key={data.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/players/${data.id}`}>
                                            <span>{data.display_name}</span>
                                        </Link>
                                    </th>
                                    <td className="px-6 py-4 text-center">
                                        {data.total}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {data.ongoing}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {data.void}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {data.complete}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {data.wins}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {data.loss}
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}