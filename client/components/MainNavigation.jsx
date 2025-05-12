import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from './MainNavigation.module.css';
import logoSvg from '../assets/swords.svg';
import {
    Avatar,
    HR,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarCollapse,
    NavbarToggle,
} from "flowbite-react";

export default function MainNavigation() {
    const { token, userId } = useRouteLoaderData('root');
    return (
        <Navbar fluid rounded>
            <NavLink to='/' className={`flex items-center ${({ isActive }) => isActive ? classes.active : undefined}`} end>
                <img src={logoSvg} className="mx-3 h-6 sm:h-6" alt="Sword/Challenge" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kingdom Challengers</span>
            </NavLink>
            <div className="flex md:order-2 gap-2">
                {!userId && (
                    <Avatar alt="User settings" img="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" rounded />
                )}
                {userId && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" rounded />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </DropdownHeader>
                        <DropdownItem>Dashboard</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <DropdownItem>Earnings</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>Sign out</DropdownItem>
                    </Dropdown>
                )}
                <NavbarToggle />
            </div>
            <NavbarCollapse>
                <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} end>
                    Home
                    <HR className="my-2" />
                </NavLink>
                <NavLink to='/players' className={({ isActive }) => isActive ? classes.active : undefined} >
                    Players
                    <HR className="my-2" />
                </NavLink>
                <NavLink to='/bets' className={({ isActive }) => isActive ? classes.active : undefined}>
                    Bets
                    <HR className="my-2" />
                </NavLink>
                <NavLink to='/challenges' className={({ isActive }) => isActive ? classes.active : undefined}>
                    Challenges
                    <HR className="my-2" />
                </NavLink>
            </NavbarCollapse>
        </Navbar>
    );
}