import classes from './ChallengesNavigation.module.css';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

export default function ChallengesNavigation() {
    const { token } = useRouteLoaderData('root');
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/challenges" className={({ isActive }) => isActive ? classes.active : undefined} end>All Pending Challenges</NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink to="/challenges/new" className={({ isActive }) => isActive ? classes.active : undefined}>Issue Challenge</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

