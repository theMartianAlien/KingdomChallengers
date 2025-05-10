import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('admin');
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

export function getUserId() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        return null;
    }
    return userId;
}

export function tokenLoader() {
    const token = getAuthToken();
    const adminToken = getAdminToken();
    const userId = getUserId();
    return { token, userId, adminToken }
}

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }
}