import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('username');
    localStorage.removeItem('handle');
    localStorage.removeItem('accountid');
    localStorage.removeItem('token');
    localStorage.removeItem('player_id');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    localStorage.removeItem('image');
    localStorage.removeItem('nickname');
    return redirect('/');
}