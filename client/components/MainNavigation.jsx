import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
    const { token, userId } = useRouteLoaderData('root');
    return (
        <header className={classes.header}>
            <nav className={classes.navigation}>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/players' className={({ isActive }) => isActive ? classes.active : undefined}>Players</NavLink>
                    </li>
                    <li>
                        <NavLink to='/bets' className={({ isActive }) => isActive ? classes.active : undefined}>Bets</NavLink>
                    </li>
                    <li>
                        <NavLink to='/challenges' className={({ isActive }) => isActive ? classes.active : undefined}>Challenges</NavLink>
                    </li>
                </ul>
                <ul className={classes.list}>
                    {userId && (
                        <li>
                            <NavLink to={`/profile/${userId}`} className={({ isActive }) => isActive ? classes.active : undefined} end>Profile</NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <Form action="/logout" method="post">
                                <button>Logout</button>
                            </Form>
                        </li>
                    )}
                    {!token && (
                        <li>
                            <NavLink to='/login' className={({ isActive }) => isActive ? classes.active : undefined} end>Login</NavLink>
                        </li>)}
                    {!token && (
                        <li>
                            <NavLink to='/register' className={({ isActive }) => isActive ? classes.active : undefined}>Register</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}