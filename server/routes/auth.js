import express from 'express';
import { getDiscordHandlerUser } from '../data/discord-users.mjs';
import { getAccount, registerUser } from '../data/auth.mjs';
import { createAdminJSONToken, createJSONToken, hashPassword } from '../util/auth.mjs';

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
        const leAccount = await registerUser(accountData);
        let userToken = createJSONToken(accountData.discord_handle);
        if (discord_handler.isAdmin) {
            userToken = createAdminJSONToken(accountData.discord_handle);
        }
        res.status(201).json({
            message: `Registration Complete, Welcome ${data.display_name}!`,
            user: leAccount,
            token: userToken
        });
    } catch (error) {
        next(error);
    }
});

export default router;