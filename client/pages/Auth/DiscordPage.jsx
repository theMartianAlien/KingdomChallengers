import { useEffect, useState } from "react";
import { Link, useLocation, useSubmit } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { setUserData } from "../../util/auth";
const guildID = import.meta.env.VITE_GUILD_ID

export default function DiscordPage() {
    const { hash } = useLocation();
    const params = new URLSearchParams(hash.substring(1));
    let tokenType = params.get("token_type");
    let accessToken = params.get("access_token");
    const [discordLoginData, setDiscordLoginData] = useState({
        discord_id: '',
        username: '',
        display_name: '',
        image: '',
        nickname: ''
    });
    const submit = useSubmit();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`https://discord.com/api/users/@me/guilds/${guildID}/member`, {
                    headers: {
                        authorization: `${tokenType} ${accessToken}`,
                    },
                })
                const resData = await response.json();
                if (!resData.code) {
                    setDiscordLoginData(
                        {
                            discord_id: resData.user.id,
                            username: resData.user.username,
                            display_name: resData.user.global_name,
                            image: `https://cdn.discordapp.com/avatars/${resData.user.id}/${resData.user.avatar}.jpg`,
                            nickname: resData.nick,
                        }
                    );
                    const formData = new FormData();
                    formData.append("discord_id", resData.user.id);
                    formData.append("username", resData.user.username);
                    formData.append("display_name", resData.user.global_name);
                    formData.append("image", `https://cdn.discordapp.com/avatars/${resData.user.id}/${resData.user.avatar}.jpg`);
                    formData.append("nickname", resData.nick);
                    submit(formData, { method: 'post' });
                }
            }
            catch (error) {
                throw new Response({ message: "Error somewhere", error });
            }
        }

        fetchData();
    }, []);
    return (
        <>
            {discordLoginData && (
                <div className="flex items-center justify-center h-96 bg-discord-gray text-white flex-col">
                    <div className="text-2xl">
                        <p>Welcome to the Kingdom Challenges,</p>
                    </div>
                    <div className="text-4xl mt-3 flex items-center font-medium" >
                        {discordLoginData && discordLoginData.image && (
                            <p className="flex">
                                <img src={discordLoginData.image} id="avatar" className="rounded-full w-12 h-12 mr-3" />
                                <span id="name">{discordLoginData.nickname}</span>
                            </p>
                        )}
                    </div>
                    <div className="flex justtify-center gap-2">
                        <Link to="/" className="text-sm mt-5 p-2 border rounded">Continue</Link>
                        <Link to="/logout" className="text-sm mt-5 p-2 border rounded">Logout</Link>
                    </div>
                </div>
            )}
        </>
    );
}

export async function action({ request, params }) {
    const data = await request.formData();
    const method = request.method;
    const discord_id = data.get('discord_id');
    const username = data.get('username');
    const display_name = data.get('display_name');
    const image = data.get('image');
    const nickname = data.get('nickname');

    const discordData = {
        discord_id,
        username,
        display_name,
        image,
        nickname,
    }

    const resData = await usePatchPostFetch("auth/discord", method, discordData);
    if (resData.status === 422 || resData.status === 401) {
        return resData;
    }
    setUserData({ ...resData });
}