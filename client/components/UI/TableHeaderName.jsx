import { use, useState } from "react";

export default function TableHeaderName({ sortable, label, column, isAsc, onClickHeader, currentSortColumn }) {
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

    console.log('column ' + column + ' ' + selected);

    return (
        <th
            key={column}
            scope="col"
            className="px-6 py-3 text-gray-800 dark:text-white cursor-pointer"
            onClick={IconChangeHandler}>
            <div className="flex items-center justify-center space-x-2">
                {sortable && (
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