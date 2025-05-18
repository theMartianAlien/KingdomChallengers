import { Link } from "react-router-dom";

export default function CustomLink({ to, label, prefix }) {

    let link = '/' + to;
    if(prefix) {
        link = "/" + prefix + link
    }

    return (
        <Link to={link}>
            {label}
        </Link>
    );
}