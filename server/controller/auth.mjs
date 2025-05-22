import { logError, logMessage } from "../util/logging.mjs";
import DiscordUtil from "../data/utils/DiscordUtil.mjs";
import Player from "../models/Player.mjs";
import PlayersUtil from "../data/utils/PlayersUtil.mjs";
import { hashPassword, isValidPassword } from "../util/auth.mjs";
import Account from "../models/Account.mjs";
import AccountsUtil from "../data/utils/AccountsUtil.mjs";
import Discord from "../models/Discord.mjs";

const register = async (req, res, next) => {
    try {
        logMessage("-----------register--------------");
        const data = req.body;
        let errors = {};
        if (!data.password || data.password.length <= 3 || data.password.length >= 20 || !data["repeat-password"]) {
            errors.password = "Invalid passwords"
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }

        const isNotTheSame = (data.password.toUpperCase() !== data["repeat-password"].toUpperCase())
        if (isNotTheSame) {
            errors.passwords = "Passwords and repeat passwords are not the same"
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }

        if (!data.username || (data.username.length <= 3 && data.username.length >= 20)) {
            errors.username = "Invalid username"
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }
        const discordUser = await DiscordUtil.findByDiscordHandle(data.discord_handle, data.user_key);
        if (!discordUser || !data.user_key) {
            errors.discord_signup = `Unable to login discord handle: ${data.username}`;
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }
        let account = await AccountsUtil.findAccountByDiscordHandleId(discordUser._id);
        if (account) {
            errors.user_exist = "The user has an account, please try to login.";
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }
        const player = await PlayersUtil.findPlayerAndUpdateDisplayName(discordUser._id, data.nickname);

        if (!player) {
            logMessage("-----------player--------------");
            logMessage(player);
            return res
                .status(422)
                .json({
                    message: 'User signup failed due to validation errors.',
                    errors: errors,
                    data: {
                    }
                })
        }

        const hasPassword = await hashPassword(data.password);
        const image = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg';
        const createNewAccount = new Account({
            nickname: data.nickname,
            username: data.username,
            password: hasPassword,
            discord_handle_id: discordUser._id,
            player_id: player._id,
            image: image
        });

        await createNewAccount.save();

        const accountData = await AccountsUtil.createAccountForUILogin(discordUser, player, createNewAccount);

        logMessage("-----------register--------------");
        return res.status(201)
            .json({
                message: `Registration Complete, Welcome ${player.display_name}!`,
                account: accountData,
                errors: []
            });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        logMessage("-----------login--------------");

        const username = req.body.username;
        const password = req.body.password;
        let errors = {};
        const account = await AccountsUtil.findAccountByUserName(username);
        if (!account || !account.password) {
            errors.credentials = 'Invalid username or password entered.';
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'Invalid credentials!',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }
        const isValid = await isValidPassword(password, account.password);
        if (!isValid) {
            errors.credentials = 'Invalid username or password entered.';
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'Invalid credentials!',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }

        const discordUser = await Discord.findById(account.discord_handle_id);
        const player = await Player.findById(account.player_id);
        const accountData = await AccountsUtil.createAccountForUILogin(discordUser, player, account);

        logMessage("-----------login--------------");
        return res.status(201)
            .json({
                message: `Registration Complete, Welcome ${player.display_name}!`,
                account: accountData,
                errors: []
            });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const discord = async (req, res, next) => {
    try {
        logMessage("-----------discord--------------");
        const data = req.body;
        let errors = {};
        const discordUser = await DiscordUtil.findByDiscordHandle(data.username);
        if (!discordUser) {
            errors.discord_signup = `Unable to login discord user with: ${data.username} discord login`;
            if (Object.keys(errors).length > 0) {
                return res
                    .status(422)
                    .json({
                        message: 'Discord login error!',
                        errors: errors,
                        data: {
                        }
                    })
            }
        }

        const player = await PlayersUtil.findPlayerAndUpdateDisplayName(discordUser._id, data.nickname);
        if (!player) {
            errors.player_error = `Unable find player user with: ${data.username} discord login`;
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'Discord login error!',
                    errors
                }
            }
        }
        let account = await AccountsUtil.findAccountByDiscordId(data.discord_id);
        if (account) {
            account.nickname = data.nickname;
            account.username = data.username;
            account.image = data.image
        } else {
            account = await AccountsUtil.findAccountByDiscordHandleId(discordUser._id);
            if (account) {
                await Account.findByIdAndUpdate(
                    { _id: account._id },
                    { discord_id: data.discord_id, image: data.image }
                );
            } else {
                account = new Account({
                    nickname: data.nickname,
                    username: data.username,
                    discord_handle_id: discordUser._id,
                    discord_id: data.discord_id,
                    player_id: player._id,
                    image: data.image
                });

            }
        }
        await account.save();
        const accountData = await AccountsUtil.createAccountForUILogin(discordUser, player, account);
        logMessage("-----------discord--------------");
        return res.status(201)
            .json({
                message: `Registration Complete, Welcome ${player.display_name}!`,
                account: accountData,
                errors: []
            });
    } catch (error) {
        logError(error);
        next(error);
    }
}

const findAccountById = async (req, res, next) => {
    try {
        logMessage("-----------findAccountById--------------");
        const id = req.params.id;
        const account = await Account.findById(id);
        if (!account) {
            logMessage("-----------account--------------");
            logMessage(account);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }
        const player = await Player.findById(account.player_id);
        const discordUser = await Discord.findById(account.discord_handle_id);
        if (!discordUser || !player) {
            logMessage("-----------discordUser--------------");
            logMessage(discordUser);
            logMessage("-----------player--------------");
            logMessage(player);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }
        logMessage("-----------findAccountById--------------");
        res.json({
            _id: account._id,
            display_name: player.display_name,
            nickname: account.nickname,
            username: account.username,
            discord_handle: discordUser.discord_handle,
            image: account.image,
            hasPassword: (account.password ? true : false)
        });
    } catch (error) {
        logMessage(error);
        next(error);
    }
}

const updateAccount = async (req, res, next) => {
    try {
        logMessage("-----------updateAccount--------------");
        const id = req.params.id;
        const data = req.body;
        let account = await Account.findById(id);
        if (!account) {
            logMessage("-----------accountData--------------");
            logMessage(account);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }
        account.username = data.username;
        account.nickname = data.nickname;
        account.image = data.image;
        if (data.password && data.repeat_password) {
            const isNotTheSame = (data.password.toUpperCase() !== data.repeat_password.toUpperCase())
            if (isNotTheSame) {
                return res
                    .status(422)
                    .json({
                        message: 'User signup failed due to validation errors.',
                        errors: { passwords: "Passwords and repeat passwords are not the same" },
                        data: {
                        }
                    })
            }

            accountData.password = await hashPassword(data.password);
        }
        await account.save();

        const player = await Player.findById(account.player_id);
        if (!player) {
            logMessage("-----------player--------------");
            logMessage(player);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }
        player.display_name = data.display_name;
        console.log(player);
        if (!player) {
            logMessage("-----------player--------------");
            logMessage(player);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }
        await player.save();

        const discordUser = await Discord.findById(account.discord_handle_id);
        if (!discordUser) {
            logMessage("-----------discordUser--------------");
            logMessage(discordUser);
            return res.status(404).json({ message: 'Unable to find account data: ' + id });
        }

        const accountData = await AccountsUtil.createAccountForUILogin(discordUser, player, account);
        logMessage("-----------updateAccount--------------");
        return res.status(201)
            .json({
                message: 'Account successfully modified!',
                account: {
                    ...accountData,
                    hasPassword: (account.password ? true : false)
                },
                errors: []
            });

    } catch (error) {
        logMessage(error);
        next(error);
    }
}

export default {
    register,
    login,
    discord,
    findAccountById,
    updateAccount
};