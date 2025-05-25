import { useState } from "react";
import TableHeaderName from "./TableHeaderName";

export default function CustomTable({
    data = [],
    columns = [],
    primaryColumn,
    isAsc = true,
    prefix = "",
    sortable = true,
    divClass = "relative overflow-x-auto shadow-md sm:rounded-lg lg:p-8",
    tableClass = "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
    headerClass = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    rowClass = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-20",
    firstColClass = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
    colSize = "px-6 py-4 text-center"
}) {
    const initialSortedData = sortData(data, primaryColumn, isAsc);
    const [sortedData, setSortedData] = useState(initialSortedData);
    const [sortDirections, setSortDirections] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.column]: isAsc ? 'asc' : 'desc' }), {})
    );
    const [activeSortColumn, setActiveSortColumn] = useState(primaryColumn);

    function handleSort(column) {
        const isCurrentlyAsc = sortDirections[column] === 'asc';
        const newDirection = isCurrentlyAsc ? 'desc' : 'asc';

        setActiveSortColumn(column);
        setSortDirections((prev) => ({ ...prev, [column]: newDirection }));

        const sorted = sortData(data, column, newDirection === 'asc');
        setSortedData(sorted);
    }

    function sortData(arr, column, ascending = true) {
        if (!column) return [...arr];

        return [...arr].sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            try {
                valA = typeof valA === 'string' ? valA.toUpperCase() : valA;
                valB = typeof valB === 'string' ? valB.toUpperCase() : valB;
            } catch (e) { }

            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
            return 0;
        });
    }

    const CustomLink = columns[0]?.element;

    return (
        <div className={divClass}>
            <table className={tableClass}>
                <thead className={headerClass}>
                    <tr>
                        {columns.map((col) => (
                            <TableHeaderName
                                key={col.column}
                                label={col.column_name}
                                column={col.column}
                                sortable={sortable}
                                isAsc={sortDirections[col.column] === 'asc'}
                                currentSortColumn={activeSortColumn}
                                onClickHeader={handleSort}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row) => (
                        <tr key={row._id} className={rowClass}>
                            <th scope="row" className={firstColClass}>
                                {CustomLink ? (
                                    <CustomLink label={row[columns[0].column]} to={row._id} prefix={prefix} isClean={columns[0]?.isClean} className={columns[0]?.className}/>
                                ) : (
                                    row[columns[0].column]
                                )}
                            </th>

                            {columns.slice(1).map((col) => {
                                const CellComponent = col.element;
                                const value = row[col.column];
                                const suffix = col?.suffix;
                                const cellClassName = col?.className;
                                const isClean = col?.isClean

                                return (
                                    <td key={col.column} className={colSize}>
                                        {CellComponent && !col.label && (
                                            <CellComponent to={row.link} label="Bet Link" />
                                        )}
                                        {CellComponent && col.label === 'Edit' && (
                                            <CellComponent to={value} label="Edit" isClean={isClean} className={cellClassName} />
                                        )}
                                        {CellComponent && col.label === 'Delete' && (
                                            <CellComponent id={value} prefix={prefix} suffix={suffix} isClean={isClean} className={cellClassName} >Delete</CellComponent>
                                        )}
                                        {!CellComponent && value}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}