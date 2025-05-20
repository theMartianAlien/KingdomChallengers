import express from 'express';
import { isAuthenticate } from '../util/auth.mjs';
import { logMessage } from '../util/logging.mjs';
import { discordLogin, getAccountInfo, login, register, updateUserAccount } from '../controller/auth.mjs';

const router = express();

router.post('/register', async (req, res, next) => {
    try {
        logMessage("discordLogin called");
        const result = await register(req.body);
        return res.status(result.status)
            .json({
                message: result.message,
                account: result.data,
                errors: result.errors
            });
    } catch (error) {
        logMessage(error);
        return res.status(422).json({ message: "Something went wrong!" })
    }
});

router.post('/login', async (req, res, next) => {
    try {
        logMessage("loginUserCalled called");
        const result = await login(req.body);
        return res.status(result.status)
            .json({
                message: result.message,
                account: result.data,
                errors: result.errors
            });
    } catch (error) {
        logMessage(error);
        return res.status(401).json({ message: 'Authentication failed!' });
    }
});

router.post('/discord', async (req, res, next) => {
    try {
        logMessage("discordLogin called");
        const result = await discordLogin(req.body);
        return res.status(result.status)
            .json({
                message: result.message,
                account: result.data,
                errors: result.errors
            });
    }
    catch (error) {
        logMessage(error);
        return res.status(401).json({ message: 'Authentication failed!' });
    }
});

router.use(isAuthenticate);

router.get('/:id', async (req, res, next) => {
    try {
        logMessage("getAccountData called");
        const id = req.params.id;
        const accountData = await getAccountInfo(id);
        res.json({ account: accountData });
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        logMessage("modifyAccountData called");
        const result =  await updateUserAccount(req.body);

                return res.status(result.status)
            .json({
                message: result.message,
                account: result.data,
                errors: result.errors
            });

    } catch (error) {
        next(error);
    }
});

export default router;