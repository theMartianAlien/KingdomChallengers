import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { compare, hash } from 'bcryptjs';
import { loadEnv } from './configLoader.mjs';
import { NotAuthError } from './errors.js';
import { logMessage } from './logging.mjs';

loadEnv();

const SKIP_AUTHENTICATION = process.env.SKIP_AUTHENTICATION;
const KEY = process.env.USER_KEY;
const ADMIN = process.env.ADMIN_KEY;

export async function hashPassword(password) {
    return await hash(password, 12);
}

export function createAdminJSONToken(handle) {
    return sign({ handle }, ADMIN, { expiresIn: '24h' });
}

export function createJSONToken(handle) {
    return sign({ handle }, KEY, { expiresIn: '8h' });
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

function validate(req, res, next) {
    try {
        if (SKIP_AUTHENTICATION) {
            logMessage("Authentication skipped");
            return null;
        }
        if (req.method === 'OPTIONS') {
            logMessage("Not authenticated: OPTIONS");
            return next();
        }
        if (!req.headers.authorization) {
            logMessage('NOT AUTH. AUTH HEADER MISSING.');
            return 'Not authenticated.';
        }
        const authFragments = req.headers.authorization.split(' ');
        if (authFragments.length !== 2) {
            logMessage('NOT AUTH. AUTH HEADER INVALID.');
            return 'Not authenticated.';
        }
    }
    catch {
        return 'Not authenticated.';
    }

    return null;
}

export function isAuthenticate(req, res, next) {
    if (SKIP_AUTHENTICATION) {
        logMessage("Authentication skipped");
        return next();
    }
    const isNext = validate(req, res, next);
    if (isNext) {
        return next(new NotAuthError(isNext));
    }
    const authFragments = req.headers.authorization.split(' ');
    const authToken = authFragments[1];
    try {
        logMessage(SKIP_AUTHENTICATION);
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        logMessage('NOT AUTH. TOKEN INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}

export function isAdminAuthenticate(req, res, next) {
    if (SKIP_AUTHENTICATION) {
        logMessage("Authentication skipped");
        return next();
    }
    const isNext = validate(req, res, next);
    if (isNext) {
        return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');
    const authToken = authFragments[1];
    try {
        const validatedToken = validateADMINToken(authToken);
        req.token = validatedToken;
    } catch (error) {
        logMessage('NOT AUTH. TOKEN INVALID.');
        return next(new NotAuthError('Not authenticated.'));
    }
    next();
}