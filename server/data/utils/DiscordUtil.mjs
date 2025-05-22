import Discord from '../../models/Discord.mjs';

const findByDiscordHandle = async (discord_handle, user_key) => {
    if (!discord_handle)
        return undefined;
    let discordUser = await Discord.findOne({ discord_handle }).exec();
    if (user_key) {
        discordUser = await Discord.findOne({ discord_handle, user_key }).exec();
    }
    if (!discordUser)
        return undefined;

    return discordUser;
}

export default {
    findByDiscordHandle
}