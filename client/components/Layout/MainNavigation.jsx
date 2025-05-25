import { Form, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from './MainNavigation.module.css';
import logoSvg from '../../assets/swords.svg';
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
    NavbarLink,
} from "flowbite-react";
import { useState } from "react";

export default function MainNavigation() {
    const { image, player_id, nickname, discord_handle, adminToken } = useRouteLoaderData('root');
    let imgProfile = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg';
    if (image) {
        imgProfile = image;
    }

    let userText = nickname || 'Guest';
    if (nickname) {
        userText = nickname;
    }

    const [isDropDownExpanded, setIsDrowDownExpanded] = useState(false);

    function OnClickDropDown() {
        setIsDrowDownExpanded(prevState => !prevState);
    }

    return (
        <Navbar className="sticky w-full z-20 top-0 start-0" fluid rounded>
            <NavLink to='/'>
                <div className="flex items-center">
                    <img src={logoSvg} className="mx-3 h-6 sm:h-6" alt="Sword/Challenge" />
                    <span className="truncate xs:whitespace-normal xs:overflow-visible xs:text-clip">Kingdom Challengers</span>
                </div>
            </NavLink>
            <div className="flex md:order-2 gap-2">
                <Dropdown
                    arrowIcon={false}
                    dismissOnClick={true}
                    inline
                    label={
                        <Avatar alt="User settings" img={imgProfile} rounded className="cursor-pointer"/>
                    }>{
                        !player_id && (
                            <DropdownHeader>
                                <Link to="/login" onClick={OnClickDropDown} >Sign In</Link>
                            </DropdownHeader>
                        )
                    }
                    {
                        player_id && (
                            <>
                                <DropdownHeader>
                                    <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""} end>
                                        <span className="block text-sm">{userText}</span>
                                        <span className="block truncate text-sm font-medium">{discord_handle}</span>
                                    </NavLink>
                                </DropdownHeader>
                                <DropdownItem>
                                    <NavLink to="/challenges/new" className={({ isActive }) => isActive ? "active" : ""}>
                                        Issue Challenge
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink to={`/players/${player_id}`} className={({ isActive }) => isActive ? "active" : ""}>
                                        Current Bet
                                    </NavLink>
                                </DropdownItem>
                                <DropdownDivider />
                                <li className="menuitem">
                                    <Form action="/logout" method="post">
                                        <button className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 
                                        hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 
                                        dark:focus:text-black">Logout</button>
                                    </Form>
                                </li>
                            </>
                        )
                    }
                </Dropdown>
                <NavbarToggle />
            </div>
            <NavbarCollapse className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <NavLink to='/' className={({ isActive }) => isActive ? classes.active : undefined} end>
                    Home
                    <HR className="my-2 md:hidden" />
                </NavLink>
                <NavLink to='/players' className={({ isActive }) => isActive ? classes.active : undefined} >
                    Players
                    <HR className="my-2 md:hidden" />
                </NavLink>
                <NavLink to='/bets' className={({ isActive }) => isActive ? classes.active : undefined}>
                    Bets
                    <HR className="my-2 md:hidden" />
                </NavLink>
                <NavLink to='/challenges' className={({ isActive }) => isActive ? classes.active : undefined}>
                    Challenges
                </NavLink>
                {adminToken && (
                <NavLink to='/discord' className={({ isActive }) => isActive ? classes.active : undefined}>
                    Discord
                </NavLink>)}
            </NavbarCollapse>
        </Navbar>
    );
}