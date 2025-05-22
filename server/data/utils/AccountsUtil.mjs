import Account from '../../models/Account.mjs';
import { createAdminJSONToken, createJSONToken } from '../../util/auth.mjs';

const findAccountByDiscordHandleId = async (discord_handle_id) => {
    if (discord_handle_id) {
        return await Account.findOne({ discord_handle_id }).exec();
    }

    return undefined;
}

const findAccountByDiscordId = async (discord_id) => {
    if (discord_id) {
        return await Account.findOne({ discord_id }).exec();
    }

    return undefined;
}

const findAccountByUserName = async (username) => {
    if (username) {
        return await Account.findOne({ username }).exec();
    }

    return undefined;
}

const createAccountForUILogin = async (discordUser, playerInfo, account) => {
    let token = createJSONToken(discordUser.discord_handle);
    let adminToken;
    if (discordUser.isAdmin) {
        adminToken = createAdminJSONToken(account.discord_handle);
    }
    // const eightHours = getEightHours();
    // const storedToken = {
    //     accountId: account._id,
    //     token,
    //     adminToken,
    //     eightHours
    // }

    // await storeTokenForLoggedUser(storedToken);

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


export default {
    findAccountByDiscordHandleId , 
    findAccountByDiscordId,
    findAccountByUserName,
    createAccountForUILogin
}