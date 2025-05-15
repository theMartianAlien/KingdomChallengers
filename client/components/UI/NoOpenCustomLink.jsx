import { Link } from "react-router-dom";

export default function NoOpenCustomLink({ to, label }) {
    return (
        <Link to={to} target="_blank"
            rel="noopener noreferrer">
            {label}
        </Link>
    );
}