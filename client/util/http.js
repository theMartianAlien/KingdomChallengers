import { QueryClient } from '@tanstack/react-query';
const guildID = import.meta.env.VITE_GUILD_ID

export const queryClient = new QueryClient();

export async function discordFetchData({hash}){

    const params = new URLSearchParams(hash.substring(1));
    let tokenType = params.get("token_type");
    let accessToken = params.get("access_token");

    const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildID}/member`, {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
    const resData = await response.json();

    const discordData = {
        discord_id: resData.user.id,
        username: resData.user.username,
        display_name: resData.user.global_name,
        image: `https://cdn.discordapp.com/avatars/${resData.user.id}/${resData.user.avatar}.jpg`,
        nickname: resData.nick
    }

    return discordData
}