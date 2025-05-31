import { Link } from "react-router-dom";
import clsx from "clsx";

export default function UnderlinedLink({ label, to, className, children, isClean, prefix }) {
    let defaultClass = "inline-flex items-center justify-center text-sm text-white font-medium bg-red-900 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-900 dark:hover:bg-orange-700 dark:focus:ring-orange-800 rounded-lg border px-5 py-2.5 text-center cursor-pointer";
    if(isClean){
        defaultClass = []
    }
    let link = to; 
    if(prefix) {
        link = "/" + prefix + "/"+ to;
    }
    let subItem = label;
    if (children)
        subItem = children
    return (
        <Link
            to={link}
            className={clsx(
                defaultClass,
                className)}
        >{subItem}
        </Link>
    )
}