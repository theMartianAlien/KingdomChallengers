import { Popover } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaFire } from 'react-icons/fa';
import { getFormattedDate } from "../../util/date";

export default function HitMarker({ data }) {
    let element = <p></p>
    if (data) {
        element = (
            <div className="flex items-center justify-center">
                {data.map((d,index) => (
                    <div key={index}>
                        <Popover
                            trigger="hover"
                            content={
                            <div className="w-96 text-sm text-gray-500 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                    <Link to={`/bets/${d.betId}`} className="flex items-center justify-center flex-col">
                                    <span className="text-lg font-semibold text-white dark:text-gray-300">{d.title}</span>
                                    <span className="text-sm">{getFormattedDate(d.date)}</span>
                                    </Link>
                                </div>
                            }
                        >
                            <FaFire className="text-red-700 hover:text-lg"/>
                        </Popover>{" "}
                    </div>
                ))}
            </div>
        );
    }
    return (
        <>
            {element}
        </>
    );
}