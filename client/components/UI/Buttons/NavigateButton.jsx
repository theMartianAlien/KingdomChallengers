import { Link } from "react-router-dom";
import clsx from 'clsx';

export default function NavigateButton({ to, relative = "path", className="", children, isClean }) {
    let defaultClass = ["text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"];
    if(isClean) {
        defaultClass = []
    }
    return (
        <Link
            to={to}
            relative={relative}
            className={
                clsx(
                    defaultClass,
                    className)
            }
        >
            {children}
        </Link>
    );
}