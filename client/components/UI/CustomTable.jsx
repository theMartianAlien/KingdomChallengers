import { useState } from "react";
import TableHeaderName from "./TableHeaderName";

export default function CustomTable({
    data,
    columns,
    primaryColumn,
    isAsc,                
    prefix,
    divClass = "relative overflow-x-auto shadow-md sm:rounded-lg lg:p-8",
    tableClass = "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
    headerClass = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    rowClass = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-20",
    firstColClass = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
    colSize="px-6 py-4 text-center"
}) {
    const [sortedData, SortBetsHandler] = useState(sortByColumn(data, primaryColumn, isAsc));
    const [columnSorting, SortColumnHandler] = useState(columns);
    function onSortDataByColumn(column) {
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

    const Edit = columns.find((x)=>x.label === "Edit");
    const Delete = columns.find((x)=>x.label === "Delete");

    return (
        <>
            <div className={divClass}>
                <table className={tableClass}>
                    <thead className={headerClass}>
                        <tr>
                            {
                                columns.map((column) => (
                                    <TableHeaderName
                                        key={column.column}
                                        label={column.column_name}
                                        column={column.column}
                                        isAsc={columnSorting[column.column] === 'asc'}
                                        onClickHeader={onSortDataByColumn}
                                    />
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData && (
                            sortedData.map((data) => (
                                <tr key={data._id} className={rowClass}>
                                    <th scope="row" className={firstColClass}>
                                        <CustomLink label={data[columns[0].column]} to={data._id} prefix={prefix} />
                                    </th>
                                    {[...columns].slice(1).map((col) => (
                                        <td className={colSize} key={col.column}>
                                            {col.element && !col.label && (
                                                <col.element to={data.link} label="Bet Link" />
                                            )}
                                            {col.element && col.label === 'Edit' && (
                                                <col.element to={data[Edit.column]} label="Edit" />
                                            )}
                                            {col.element && col.label === 'Delete' && (
                                                <col.element _id={data[Delete.column]} label="Delete" />
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