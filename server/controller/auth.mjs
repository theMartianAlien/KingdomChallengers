import { getAccountByDiscordHandle, getAccountByDiscordId, getAccountByDiscorHandleId, getAccountByDiscorHandleIdPlayerId, getAccountById, getAccountByUserName, registerUser, updateAccount } from "../data/auth.mjs";
import { getDiscordHandler, getDiscordHandlerUser, getDiscordUserById } from "../data/discord-users.mjs";
import { getAPlayer, getAPlayerByHandler, replaceAPlayer } from "../data/players.mjs";
import { createAdminJSONToken, createJSONToken, hashPassword, isValidPassword } from "../util/auth.mjs";
import { logMessage } from "../util/logging.mjs";

export async function discordLogin(data) {
    try {
        logMessage(data);
        // we need to write a whole lot of validation for this

        const { discordUser, discordError } = await getDiscordInfo(data.username);
        if (discordError) {
            errors.discord_signup = `Unable to login discord user with: ${data.username} discord login`;
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'Discord login error!',
                    errors
                }
            }
        }

        const { player, playerError } = await getPlayer(discordUser._id, data.nickname);
        if (playerError) {
            errors.player_error = `Unable find player user with: ${data.username} discord login`;
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'Discord login error!',
                    errors
                }
            }
        }

        // let player = await getAPlayerByDiscordHandle();
        let account = await getAccountByDiscordId(data.discord_id);
        let accountData = {
            username: data.username,
            nickname: data.nickname,
            discord_id: data.discord_id,
            image: data.image,
            discord_handle_id: discordUser._id,
            player_id: player._id
        }

        if (!account) {
            account = await getAccountByDiscordHandle(data.username);
            if (account) {
                // we will add discord_id on the account data
                await updateAccount(account._id, {
                    ...account,
                    discord_id: data.discord_id
                });
            } else {
                await registerUser(accountData);
            }
        } else {
            // we update all other information for this user.
            await updateAccount(account._id, { ...accountData });
        }

        account = await getAccountByDiscorHandleIdPlayerId(discordUser._id, player._id);

        logMessage("Data returned");
        const leAccount = acccountDataBuilder(account, discordUser, player);
        logMessage(leAccount);
        return {
            status: 201,
            message: `Registration Complete, Welcome ${player.display_name}!`,
            errors: undefined,
            data: leAccount
        }
    }
    catch (error) {
        logMessage(error);
        return {
            status: 422,
            message: 'Something went wrong!',
            errors: error,
            data: {
            }
        }
    }
}

export async function register(data) {
    try {
        logMessage("registerUser called");
        logMessage(data);
        let errors = {};
        delete data["repeat-password"];

        if (!data.username || (data.username.length <= 3 && data.username.length >= 20)) {
            errors.username = "Invalid username"
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'User signup failed due to validation errors.',
                    errors: errors,
                    data: {
                    }
                }
            }
        }

        if (!data.password || (data.password.length <= 3 && data.password.length >= 20)) {
            errors.password = "Invalid passwords"
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'User signup failed due to validation errors.',
                    errors: errors,
                    data: {
                    }
                }
            }
        }

        const isNotTheSame = (data.password.toUpperCase() !== data["repeat-password"].toUpperCase())
        if (isNotTheSame) {
            errors.passwords = "Passwords and repeat passwords are not the same"
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'User signup failed due to validation errors.',
                    errors: errors,
                    data: {
                    }
                }
            }
        }

        const { discordUser, discordError } = await getDiscordInfo(data.discord_handle, data.user_key);
        if (discordError) {
            errors.discord_signup = `Unable to login discord handle: ${data.username}`;
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'Discord login error!',
                    errors
                }
            }
        }
        // this discord handle record should be associated with a user now.
        delete data.user_key;
        delete data.discord_handle;
        delete data.display_name;

        let account = await getAccountByDiscorHandleId(discordUser._id);
        if (account) {
            errors.user_exist = "The user has an account, please try to login.";
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'User signup failed due to validation errors.',
                    errors: errors,
                    data: {
                    }
                }
            }
        }
        const { player } = await getPlayer(discordUser._id, data.nickname);

        const accountData = { ...data, discord_handle_id: discordUser._id, player_id: player._id };
        accountData.password = await hashPassword(accountData.password);
        accountData.image = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'
        await registerUser(accountData);

        account = await getAccountByDiscorHandleIdPlayerId(discordUser._id, player._id);
        const leAccount = acccountDataBuilder(account, discordUser, player);

        return {
            status: 201,
            message: `Registration Complete, Welcome ${player.display_name}!`,
            errors: undefined,
            data: leAccount
        }
    } catch (error) {
        logMessage(error);
        return {
            status: 422,
            message: 'Something went wrong!',
            errors: error,
            data: {
            }
        }
    }
}

export async function login(data) {
    const username = data.username;
    const password = data.password;
    try {
        const account = await getAccountByUserName(username);
        if (!account || !account.password) {
            return {
                status: 422,
                message: 'Invalid credentials!',
                errors: { credentials: 'Invalid username or password entered.' },
                data: {
                }
            }
        }
        const isValid = await isValidPassword(password, account.password);
        if (!isValid) {
            return {
                status: 422,
                message: 'Invalid credentials!',
                errors: { credentials: 'Invalid username or password entered.' },
                data: {
                }
            }
        }
        const leAccount = acccountDataBuilder(account, discordUser, player);
        logMessage(leAccount);

        return {
            status: 201,
            message: `Welcome back, ${account.display_name}!`,
            errors: undefined,
            data: leAccount
        }
    }
    catch (error) {
        logMessage(error);
        return {
            status: 401,
            message: 'Authentication failed!',
            errors: error,
            data: {
            }
        }
    }
}

export async function getAccountInfo(id) {
    const account = await getAccountById(id);
    const player = await getAPlayer(account.player_id.toString());
    const discordUser = await getDiscordUserById(account.discord_handle_id.toString());

    return {
        _id: account._id,
        display_name: player.display_name,
        nickname: account.nickname,
        username: account.username,
        discord_handle: discordUser.discord_handle,
        image: account.image,
        hasPassword: (account.password ? true : false)
    }
}

export async function updateUserAccount(data) {
    try {
        logMessage(data);
        let account = await getAccountById(data._id);
        let accountData = {
            ...account,
            username: data.username,
            nickname: data.nickname,
            image: data.image
        }
        if (data.password && data.repeat_password) {
            const isNotTheSame = (data.password.toUpperCase() !== data.repeat_password.toUpperCase())
            if (isNotTheSame) {
                return {
                    status: 422,
                    message: 'User signup failed due to validation errors.',
                    errors: { passwords: "Passwords and repeat passwords are not the same" },
                    data: {
                    }
                }
            }

            accountData.password = await hashPassword(data.password);
        }
        await updateAccount(account._id, accountData)

        let player = await getAPlayer(account.player_id.toString());
        if (player) {
            await replaceAPlayer({
                ...player,
                display_name: data.display_name
            })
        }
        player = await getAPlayer(account.player_id.toString());

        let discordUser = await getDiscordUserById(account.discord_handle_id.toString());
        const leAccount = acccountDataBuilder(account, discordUser, player);

        return {
            status: 201,
            message: 'Account successfully modified!',
            data: { ...leAccount, hasPassword: (account.password ? true : false) }
        }
    }
    catch (error) {
        logMessage(error);
        return {
            status: 401,
            message: 'Account update failed!',
            errors: error,
            data: {
            }
        }
    }
}

async function getDiscordInfo(username, user_key) {
    let discordUser = await getDiscordHandler(username);
    if (!discordUser) {
        return {
            discordError: "Discord user doesnt exist"
        }
    }

    if (user_key) {
        discordUser = await getDiscordHandlerUser(user_key, username);
        if (!discordUser) {
            return {
                discordError: "Discord user doesnt exist"
            }
        }
    }

    return { discordUser }
}

async function getPlayer(discord_handle_id, nickname) {
    let player = await getAPlayerByHandler(discord_handle_id);
    if (!player) {
        //create a player if this player doesnt exist
    } else {
        if (nickname) {
            // We replace the display name in the players table for this player
            await replaceAPlayer({
                ...player,
                display_name: nickname
            })
        }
    }
    return { player };
}

function acccountDataBuilder(account, discordUser, playerInfo) {

    let token = createJSONToken(discordUser.discord_handle);
    let adminToken;
    if (discordUser.isAdmin) {
        adminToken = createAdminJSONToken(account.discord_handle);
    }
    return {
        _id: account._id,
        image: account.image,
        player_id: playerInfo._id,
        display_name: playerInfo.display_name,
        discord_handle: discordUser.discord_handle,
        nickname: account.nickname,
        token,
        adminToken
    }
}