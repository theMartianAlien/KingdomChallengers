import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('welcome');
    localStorage.removeItem('accountId');
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('player_id');
    localStorage.removeItem('image');
    localStorage.removeItem('nickname');
    localStorage.removeItem('display_name');
    localStorage.removeItem('discord_handle');

    console.log("test");
    return redirect('/');
}