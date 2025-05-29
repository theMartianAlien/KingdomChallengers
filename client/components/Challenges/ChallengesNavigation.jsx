import classes from './ChallengesNavigation.module.css';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

export default function ChallengesNavigation() {
    const { token } = useRouteLoaderData('root');
    return (
        <div className="z-50 w-full h-16 bg-slate dark:border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="h-full max-w-lg mx-auto flex items-center justify-center gap-10 font-medium">
                <NavLink to="/challenges"
                    className={(({ isActive }) =>
                        isActive ?
                            classes.active :
                            undefined) +
                        " inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"} end
                    type="button"
                >
                    <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        All Pending Challenges
                    </span>
                </NavLink>
                {token && (<NavLink to="/challenges/new"
                    type="button"
                    className={(({ isActive }) =>
                        isActive ?
                            classes.active :
                            undefined) +
                        " inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"}
                >
                    <span className="text-sm text-white dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Issue Challenge
                    </span>
                </NavLink>)}
            </div>
        </div>
    );
}

