import { getAccount, registerUser, replaceImage, updateAccount } from "../data/auth.mjs";
import { getDiscordHandler } from "../data/discord-users.mjs";
import { getAPlayerByDiscordHandle, replaceAPlayer } from "../data/players.mjs";
import { createAdminJSONToken, createJSONToken } from "../util/auth.mjs";
import { logMessage } from "../util/logging.mjs";

export async function discordLogin(data) {
    try {
        console.log(data);
        const discordUser = await getDiscordHandler(data.username);
        if (!discordUser) {
            errors.discord_signup = `Unable to register user ${data.username}`;
            if (Object.keys(errors).length > 0) {
                return {
                    status: 422,
                    message: 'Discord login error!',
                    errors
                }
            }
        }
        let player = await getAPlayerByDiscordHandle(discordUser.discord_handle);
        let account = await getAccount(data.username);
        let accountData = {
            username: data.username,
            discord_handle: discordUser.discord_handle,
            nickname: data.nickname,
            discord_id: data.discord_id,
            image: data.image,
            nickname: data.nickname,
            player_id: player._id
        }
        if (!account) {
            if (discordUser.isAdmin) {
                accountData.isAdmin = true;
            }
            accountData.user_key = discordUser.user_key;
            await registerUser(accountData);

            await replaceAPlayer({
                ...player,
                display_name: accountData.nickname
            })

            delete accountData.isAdmin;
            delete accountData.user_key;
            delete accountData.discord_id;
            account = await getAccount(accountData.discord_handle)
        } else {
            accountData._id = account._id;
            await replaceAPlayer({
                ...player,
                display_name: accountData.nickname
            })
            logMessage("updateAccount called");
            logMessage(accountData);
            await updateAccount(account._id, { ...accountData });
            accountData = {
                ...accountData,
                display_name: accountData.nickname
            }
        }
        accountData.token = createJSONToken(account.username);
        if (discordUser.isAdmin) {
            accountData.adminToken = createAdminJSONToken(account.username);
        }

        return {
            status: 201,
            message: `Registration Complete, Welcome ${player.display_name}!`,
            errors: undefined,
            data: accountData
        }
    }
    catch(error) {
        logMessage(error);
    }
}