import express from 'express';
import { getDiscordHandler, getDiscordHandlerUser } from '../data/discord-users.mjs';
import { getAccount, getAccountByUserName, registerUser } from '../data/auth.mjs';
import { createAdminJSONToken, createJSONToken, hashPassword, isValidPassword } from '../util/auth.mjs';
import { getAPlayerByDiscordHandle, getAPlayerByHandler } from '../data/players.mjs';

const router = express();

router.post('/register', async (req, res, next) => {
    try {
        console.log("registerUser called");
        const data = req.body;
        let errors = {};

        const isNotTheSame = (data.password.toUpperCase() !== data["repeat-password"].toUpperCase())

        if (!data.username || (data.username.length <= 3 && data.username.length >= 20)) {
            errors.username = "Invalid username"
            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'User signup failed due to validation errors.',
                    errors,
                });
            }
        }

        if (!data.password || (data.password.length <= 3 && data.password.length >= 20)) {
            errors.password = "Invalid passwords"
            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'User signup failed due to validation errors.',
                    errors,
                });
            }
        }

        if (isNotTheSame) {
            errors.passwords = "Passwords and repeat passwords are not the same"
            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'User signup failed due to validation errors.',
                    errors,
                });
            }
        }

        let account = await getAccount(data.discord_handle);

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
            errors.signup = "The user information provided cannot be registered. Discord handle provided is not in the database.";
            if (Object.keys(errors).length > 0) {
                return res.status(422).json({
                    message: 'User signup failed due to validation errors.',
                    errors,
                });
            }
        }
        const player = await getAPlayerByDiscordHandle(data.discord_handle);
        const accountData = { ...data, player_id: player._id };
        accountData.password = await hashPassword(accountData.password);
        if (discord_handler.isAdmin) {
            accountData.isAdmin = true;
        }
        accountData.image = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
        delete accountData["repeat-password"]

        await registerUser(accountData);
        account = await getAccount(accountData.discord_handle);
        let userToken = createJSONToken(accountData.discord_handle);
        let adminToken;
        if (discord_handler.isAdmin) {
            adminToken = createAdminJSONToken(accountData.discord_handle);
        }
        res.status(201).json({
            message: `Registration Complete, Welcome ${data.display_name}!`,
            token: userToken,
            adminToken,
            player_id: player._id,
            _id: account._id,
            image: accountData.image,
            nickname: accountData.nickname,
            display_name: accountData.display_name,
            discord_handle: accountData.discord_handle,
            username: accountData.username,
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
                discord_handle: account.discord_handle,
                _id: account._id,
                player_id: account.player_id,
                token,
                adminToken,
                nickname: account.nickname,
                image: account.image,
                display_name: account.display_name,
                message: `Welcome back, ${account.display_name}!`
            }
            return res.status(201).json({ ...accountData });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Authentication failed!' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/discord', async (req, res, next) => {
    try {
        console.log("discordLogin called");
        try {
            const discordUser = await getDiscordHandler(req.body.username);
            if (!discordUser) {
                errors.discord_signup = `Unable to register user ${req.body.username}`;
                if (Object.keys(errors).length > 0) {
                    return res.status(422).json({
                        message: 'Discord login error!',
                        errors,
                    });
                }
            }
            const player = await getAPlayerByDiscordHandle(discordUser.discord_handle);
            let account = await getAccount(req.body.username);
            let accountData = {
                username: req.body.username,
                discord_handle: req.body.username,
                display_name: req.body.display_name,
                nickname: req.body.nickname,
                discord_id: req.body.discord_id,
                image: req.body.image,
                nickname: req.body.nickname,
                player_id: player._id
            }
            if (!account) {
                if (discordUser.isAdmin) {
                    accountData.isAdmin = true;
                }
                accountData.user_key = discordUser.user_key;
                await registerUser(accountData);

                delete accountData.isAdmin;
                delete accountData.user_key;
                delete accountData.discord_id;
                account = await getAccount(accountData.discord_handle)
            } else {
                accountData._id = account._id;
            }
            accountData.token = createJSONToken(account.username);
            if (account.isAdmin) {
                accountData.adminToken = createAdminJSONToken(account.username);
            }
            return res.status(201).json({
                ...accountData,
                message: `Registration Complete, Welcome ${account.display_name}!`
            });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ message: 'Authentication failed!' });
        }

    } catch { }
});

export default router;