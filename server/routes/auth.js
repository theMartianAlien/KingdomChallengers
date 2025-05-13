import express from 'express';
import { getDiscordHandlerUser } from '../data/discord-users.mjs';
import { getAccount, getAccountByUserName, registerUser } from '../data/auth.mjs';
import { createAdminJSONToken, createJSONToken, hashPassword, isValidPassword } from '../util/auth.mjs';
import { getAPlayerByDiscordHandle, getAPlayerByHandler } from '../data/players.mjs';

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
        const player = await getAPlayerByDiscordHandle(data.discord_handle);
        const accountData = { ...data, player_id: player._id };
        accountData.password = await hashPassword(accountData.password);
        if (discord_handler.isAdmin) {
            accountData.isAdmin = true;
        }
        await registerUser(accountData);
        let userToken = createJSONToken(accountData.discord_handle);
        let adminToken;
        if (discord_handler.isAdmin) {
            adminToken = createAdminJSONToken(accountData.discord_handle);
        }
        res.status(201).json({
            message: `Registration Complete, Welcome ${data.display_name}!`,
            token: userToken,
            player_id: player._id,
            adminToken
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        console.log("loginUserCalled called");
        const username = req.body.username;
        const password = req.body.password;
        try {
            const account = await getAccountByUserName(username);
            const isValid = await isValidPassword(password, account.password);
            if (!isValid) {
                return res.status(422).json({
                    message: 'Invalid credentials!',
                    errors: { credentials: 'Invalid username or password entered.' }
                });
            }

            let token = createJSONToken(account.username);
            let adminToken;
            if (account.isAdmin) {
                adminToken = createAdminJSONToken(account.username);
            }
            const accountData = {
                username: account.username,
                handle: account.discord_handle,
                id: account._id,
                player_id: account.player_id,
                token,
                adminToken
            }
            return res.status(201).json({ ...accountData });
        }
        catch (error) {
            console.log(req.body);
            console.log(error);
            return res.status(401).json({ message: 'Authentication failed!' });
        }
    } catch (error) {
        next(error);
    }
});

export default router;