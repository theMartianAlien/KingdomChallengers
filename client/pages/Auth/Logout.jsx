import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('username');
    localStorage.removeItem('handle');
    localStorage.removeItem('accountId');
    localStorage.removeItem('token');
    localStorage.removeItem('player_id');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('image');
    localStorage.removeItem('nickname');
    return redirect('/');
}