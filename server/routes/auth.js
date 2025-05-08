import express from 'express';
import { getDiscordHandlerUser } from '../data/discord-users.mjs';
import { getAccount, getAccountByUserName, getUserAccount, registerUser } from '../data/auth.mjs';
import { createAdminJSONToken, createJSONToken, hashPassword, isValidPassword } from '../util/auth.mjs';

const router = express();

router.post('/register', async (req, res, next) => {
    try {
        console.log("registerUser called");
        const data = req.body;
        let errors = {};
        const account = await getAccount(data.discord_handle);

        if (account) {
            errors.user_exist = "The user has an account, please try to login.";
            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'User signup failed due to validation errors.',
                    errors,
                });
            }
        }

        const discord_handler = await getDiscordHandlerUser(data.user_key, data.discord_handle);

        if (!discord_handler) {
            errors.signup = "The user information provided cannot be registered.";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                message: 'User signup failed due to validation errors.',
                errors,
            });
        }

        const accountData = { ...data };
        accountData.password = await hashPassword(accountData.password);
        if (discord_handler.isAdmin) {
            accountData.isAdmin = true;
        }
        const leAccount = await registerUser(accountData);
        let userToken = createJSONToken(accountData.discord_handle);
        if (discord_handler.isAdmin) {
            userToken = createAdminJSONToken(accountData.discord_handle);
        }
        res.status(201).json({
            message: `Registration Complete, Welcome ${data.display_name}!`,
            token: userToken
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        console.log("registerUser called");
        const username = req.body.username;
        const password = req.body.password;
        try {
            const account = await getAccountByUserName(username);
            const isValid = await isValidPassword(password, account.password);
            if (!isValid) {
                return res.status(422).json({
                    message: 'Invalid credentials.',
                    errors: { credentials: 'Invalid username or password entered.' }
                });
            }

            let token = createJSONToken(account.username);
            if (account.isAdmin) {
                token = createAdminJSONToken(account.username);
            }

            return res.status(201).json({ token, id: account._id });
        }
        catch (error) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
    } catch (error) {
        next(error);
    }
});

export default router;