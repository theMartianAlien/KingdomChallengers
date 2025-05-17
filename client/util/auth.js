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
    const admin = localStorage.getItem('adminToken');
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
    const accountId = localStorage.getItem('accountId');
    if (!accountId) {
        return null;
    }
    return accountId;
}

export function getPlayerId() {
    const player_id = localStorage.getItem('player_id');
    if (!player_id) {
        return null;
    }
    return player_id;
}

export function setUserData({ token, adminToken, username, discord_handle, _id, player_id, image, display_name, nickname }) {
    const expiration = new Date();
    let expirationTime = expiration.getHours() + 8;
    localStorage.setItem("token", token);
    if (adminToken) {
        localStorage.setItem("adminToken", adminToken);
        expirationTime = expiration.getHours() + 24;
    }
    expiration.setHours(expirationTime);
    localStorage.setItem('expiration', expiration.toISOString());
    localStorage.setItem('username', username);
    localStorage.setItem('discord_handle', discord_handle);
    localStorage.setItem('player_id', player_id);
    localStorage.setItem('accountId', _id);
    localStorage.setItem('image', image);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('display_name', display_name);
}

export function getUserName() {
    const username = localStorage.getItem('username');
    if (!username) {
        return null;
    }
    return username;
}

export function getDiscordHandle() {
    const discord_handle = localStorage.getItem('discord_handle');
    if (!discord_handle) {
        return null;
    }
    return discord_handle;
}

export function getImage() {
    const image = localStorage.getItem('image');
    if (!image) {
        return null;
    }
    return image;
}
export function getNickName() {
    const nickname = localStorage.getItem('nickname');
    if (!nickname) {
        return null;
    }
    return nickname;
}
export function getDisplayName() {
    const display_name = localStorage.getItem('display_name');
    if (!display_name) {
        return null;
    }
    return display_name;
}

export function tokenLoader() {
    const token = getAuthToken();
    const adminToken = getAdminToken();
    const player_id = getPlayerId();
    const username = getUserName();
    const discord_handle = getDiscordHandle();
    const image = getImage();
    const nickname = getNickName();
    const display_name = getDisplayName();
    const accountId = getAccountId();

    return { token, adminToken, username, discord_handle, accountId, player_id, image, display_name, nickname }
}

export function checkAuthLoader() {
    const token = getAdminToken();
    if (!token) {
        return redirect('/login');
    }
}