import Account from '../../models/Account.mjs';
import Token from '../../models/Token.mjs';
import TokenUtil from '../../data/utils/TokenUtil.mjs';
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

const findAccountByPlayerId = async (player_id) => {
    if (player_id) {
        return await Account.findOne({ player_id }).exec();
    }

    return undefined;
}

const findAccountByToken = async (token, adminToken) => {
    if (token) {
        return await Token.findOne({ token }).exec();
    }
    if (adminToken) {
        return await Token.findOne({ adminToken }).exec();
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

    let accountData = {
        _id: account._id,
        image: account.image,
        player_id: playerInfo._id,
        display_name: playerInfo.display_name,
        discord_handle: discordUser.discord_handle,
        nickname: account.nickname,
    }
    if (discordUser.isReady) {
        accountData.token = createJSONToken(discordUser.discord_handle);
        if (discordUser.isAdmin) {
            accountData.adminToken = createAdminJSONToken(account.discord_handle);
        }
        const now = new Date();
        const tokenAcccount = await TokenUtil.deleteTokenById(account._id)
        const newToken = new Token({
            token: accountData.token,
            adminToken: accountData.adminToken,
            accountId: accountData._id,
            loggedInTime: now
        });
        await newToken.save();
    }

    return accountData;
}


export default {
    findAccountByDiscordHandleId,
    findAccountByDiscordId,
    findAccountByPlayerId,
    findAccountByToken,
    findAccountByUserName,
    createAccountForUILogin
}