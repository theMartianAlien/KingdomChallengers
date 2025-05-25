import { useState } from "react";
import clsx from 'clsx';

export default function TableHeaderName({ sortable, label, column, isAsc, onClickHeader, currentSortColumn, className }) {
    let isSortable = sortable;
    if(column.toUpperCase() === 'EDIT' || column.toUpperCase() === 'DELETE') {
        isSortable = false;
    }
    const [isUp, setIsUp] = useState(isAsc);
    let upIcon = "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
    let downIcon = "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1";
    function IconChangeHandler() {
        onClickHeader(column);
        setIsUp(prev => !prev);
    }
    let selected = ''
    if (currentSortColumn === column) {
        selected = 'font-bold text-red-800'
    }

    return (
        <th
            key={column}
            scope="col"
            className={clsx(
                "px-6 py-3 text-gray-800 dark:text-white",
                className,
                {
                    "cursor-pointer": isSortable,
                }
            )}
            onClick={IconChangeHandler}>
            <div className="flex items-center justify-center space-x-2">
                {isSortable && (
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 8"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isUp ? downIcon : upIcon}
                        />
                    </svg>
                )}
                <span className={selected}>{label}</span>
            </div>
        </th>
    )
}