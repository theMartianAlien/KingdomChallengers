import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { compare, hash } from 'bcryptjs';
import { loadEnv } from './configLoader.mjs';
import { NotAuthError } from './errors.js';

loadEnv();

const KEY = process.env.USER_KEY;
const ADMIN = process.env.ADMIN_KEY;

export async function hashPassword(password) {
    return await hash(password, 12);
}

export function createAdminJSONToken(handle) {
    return sign({ handle }, ADMIN, { expiresIn: '8h' });
}

export function createJSONToken(handle) {
    return sign({ handle }, ADMIN, { expiresIn: '24h' });
}

export function validateADMINToken(token) {
    return verify(token, ADMIN);
}

export function validateJSONToken(token) {
    return verify(token, KEY);
}

export async function isValidPassword(password, storedPassword) {
    return await compare(password, storedPassword);
}

export function checkAuthentication(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (!req.headers.authorization) {
        console.log('NOT AUTH. AUTH HEADER MISSING.');
        return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');

    if (authFragments.length !== 2) {
        console.log('NOT AUTH. AUTH HEADER INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];
    try {
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        console.log('NOT AUTH. TOKEN INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}