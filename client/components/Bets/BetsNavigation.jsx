import classes from './BetsNavigation.module.css';
import { Dropdown } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

function BetsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        {/* <ul className={classes.list}>
          <li>
            <NavLink to="/bets" className={({ isActive }) => isActive ? classes.active : undefined} end>All Bets</NavLink>
          </li>
        </ul> */}
        <input type="text" placeholder='Search ... '></input>
      </nav>
    </header>
  );
}

export default BetsNavigation;
