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
    let imgProfile = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg';
    if (userId) {
        imgProfile = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg';
    }
    return (
        <Navbar fluid rounded>
            <NavLink to='/' className={`flex items-center ${({ isActive }) => isActive ? classes.active : undefined}`} end>
                <img src={logoSvg} className="mx-3 h-6 sm:h-6" alt="Sword/Challenge" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Kingdom Challengers</span>
            </NavLink>
            <div className="flex md:order-2 gap-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={imgProfile} rounded />
                    }
                >{
                        !userId && (
                            <DropdownHeader>
                                <NavLink to="/login" >Sign In</NavLink>
                            </DropdownHeader>
                        )
                    }
                    {
                        userId && (
                            <>
                                <DropdownHeader>
                                    <span className="block text-sm">Bonnie Green</span>
                                    <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                                </DropdownHeader>
                                <DropdownItem>Dashboard</DropdownItem>
                                <DropdownItem>Settings</DropdownItem>
                                <DropdownItem>Earnings</DropdownItem>
                                <DropdownDivider />
                                {/* <DropdownItem> */}
                                <li className="menuitem">
                                    <Form action="/logout" method="post">
                                        <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 
                                        hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 
                                        dark:focus:text-black">Logout</button>
                                    </Form>
                                </li>
                                {/* </DropdownItem> */}
                            </>
                        )
                    }
                </Dropdown>
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