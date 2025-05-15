import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    const tokenDuration = getTokenDuration();

    if (!token) {
        return null;
    }

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return token;
}

export function getAdminToken() {
    const admin = localStorage.getItem('admin');
    const tokenDuration = getTokenDuration();

    if (!admin) {
        return null;
    }

    if (tokenDuration < 0) {
        return 'EXPIRED';
    }
    return admin;
}

export function getAccountId() {
    const accountid = localStorage.getItem('accountid');
    if (!accountid) {
        return null;
    }
    return accountid;
}

export function getPlayerId() {
    const player_id = localStorage.getItem('player_id');
    if (!player_id) {
        return null;
    }
    return player_id;
}

export function tokenLoader() {
    const token = getAuthToken();
    const adminToken = getAdminToken();
    const player_id = getPlayerId();
    const username = localStorage.getItem('username');
    const handle = localStorage.getItem('handle');
    const image = localStorage.getItem('image');
    const nickname = localStorage.getItem('nickname');
    const accountid = localStorage.getItem('accountid');

    return { token, player_id, adminToken, username, handle, accountid, image, nickname }
}

export function checkAuthLoader() {
    const token = getAdminToken();
    console.log("token for admin : " + token);
    if (!token) {
        return redirect('/login');
    }
}