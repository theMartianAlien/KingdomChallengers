import { useState } from "react";
import TableHeaderName from "./TableHeaderName";
import { Link } from "react-router-dom";

export default function CustomTable({ data, columns, primaryColumn, isAsc, headerStyle, rowStyle, colSize, prefix }) {
    const [sortedData, SortBetsHandler] = useState(sortByColumn(data, primaryColumn, isAsc));
    const [columnSorting, SortColumnHandler] = useState(columns);
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

            try {
                valueA = valueA.toUpperCase();
                valueB = valueB.toUpperCase();
            }
            catch {

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
    const CustomLink = columns[0].element;

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:p-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className={headerStyle}>
                        <tr>
                            {
                                columns.map((column) => (
                                    <TableHeaderName
                                        key={column.column}
                                        label={column.column_name}
                                        column={column.column}
                                        isAsc={columnSorting[column.column] === 'asrc'}
                                        onClickHeader={onSortBets}
                                    />
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData && (
                            sortedData.map((data) => (
                                <tr key={data._id}>
                                    <th scope="row" className={rowStyle}>
                                        <CustomLink label={data[columns[0].column]} to={data._id} prefix={prefix}/>
                                    </th>
                                    {[...columns].slice(1).map((col) => (
                                        <td className={colSize} key={col.column}>
                                            {col.element && (
                                                <col.element to={data.link} label="Bet Link" />
                                            )}
                                            {!col.element && data[col.column]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}