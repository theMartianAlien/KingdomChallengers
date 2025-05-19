import { Link } from "react-router-dom";

export default function UnderlinedLinks({ label, to }) {
    return (
        <Link 
        to={to} 
        class="
        font-medium
        text-blue-600
        underline
        dark:text-blue-500
        hover:no-underline"
        >{label}
        </Link>
    )
}