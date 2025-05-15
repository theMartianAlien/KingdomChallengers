import { Link } from "react-router-dom";

export default function CustomLink({ to, label, prefix }) {
    return (
        <Link to={prefix + to}>
            {label}
        </Link>
    );
}