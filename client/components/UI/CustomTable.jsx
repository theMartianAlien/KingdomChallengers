import { useState } from "react";
import TableHeaderName from "./TableHeaderName";
import { useNavigate } from "react-router-dom";
import { clsx } from 'clsx';

export default function CustomTable({
    data = [],
    columns = [],
    primaryColumn,
    isAsc = true,
    prefix = "",
    sortable = true,
    isAllRowClickable = false,
    divClass = "relative overflow-x-auto shadow-md sm:rounded-lg lg:p-8",
    tableClass = "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-white",
    headerClass = "text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400",
    rowClass,
    firstColClass = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
    colSize = "px-6 py-4 text-center"
}) {

    rowClass =
        clsx(
            "border-b dark:border-gray-700 border-gray-200 odd:bg-slate-300 even:bg-gray-500 text-black odd:dark:bg-gray-900 even:dark:bg-gray-800 dark:text-white",
            rowClass
        )

    const navigate = useNavigate();
    const initialSortedData = sortData(data, primaryColumn, isAsc);
    const [sortedData, setSortedData] = useState(initialSortedData);
    const [sortDirections, setSortDirections] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.column]: isAsc ? 'asc' : 'desc' }), {})
    );
    const [activeSortColumn, setActiveSortColumn] = useState(primaryColumn);

    function handleSort(column) {
        if (column.toUpperCase() === 'EDIT' || column.toUpperCase() === 'DELETE') {
            return;
        }
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

            if (column === 'numberOfHits') {
                try {
                    valA = Array.isArray(valA) ? valA.length : 0;
                    valB = Array.isArray(valB) ? valB.length : 0;
                } catch (e) { }
            }

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
    const isClean = columns[0]?.isClean;
    const rowCustomClassName = columns[0]?.className;

    function rowClick(row) {
        if (isAllRowClickable && CustomLink) {
            navigate(`/${prefix}/${row._id}`);
        }
    }

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
                        <tr key={row._id} className={rowClass} onClick={() => rowClick(row)} style={{ cursor: isAllRowClickable ? 'cursor-pointer' : '' }}>
                            <th scope="row" className={firstColClass}>
                                {CustomLink ? (
                                    <CustomLink label={row[columns[0].column]} to={row._id} prefix={prefix} isClean={isClean} className={rowCustomClassName} />
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
                                        {CellComponent && col.label === 'HitMarker' && (
                                            <CellComponent data={value} />
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