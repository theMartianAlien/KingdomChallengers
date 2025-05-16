import { useState } from "react";
import { Link, redirect, useLocation, useSubmit } from "react-router-dom";
import { usePatchPostFetch } from "../../hooks/useFetch";
import { setUserData } from "../../util/auth";
import { useQuery } from "@tanstack/react-query";
import { discordFetchData } from "../../util/http";
const guildID = import.meta.env.VITE_GUILD_ID

export default function DiscordPage() {
    const { hash } = useLocation();
    const params = new URLSearchParams(hash.substring(1));
    const [discordLoginData, setDiscordLoginData] = useState({
        discord_id: '',
        username: '',
        display_name: '',
        image: '',
        nickname: ''
    });
    const submit = useSubmit();

    const { data, isPending } = useQuery({
        queryKey: ['discordData', { theParams: params }],
        queryFn: () => discordFetchData({ params })
    });
    if (!isPending) {
        try {
            setDiscordLoginData(
                {
                    discord_id: data.discord_id,
                    username: data.username,
                    display_name: data.display_name,
                    image: data.image,
                    nickname: data.nickname,
                }
            );
            const formData = new FormData();
            formData.append("discord_id", data.discord_id);
            formData.append("username", data.username);
            formData.append("display_name", data.display_name);
            formData.append("image", data.image);
            formData.append("nickname", data.nickname);
            submit(formData, { method: 'post' });
        } catch {
            return redirect('/login');
        }
    }

    return (
        <>
            {discordLoginData && (
                <div className="flex items-center justify-center h-96 bg-discord-gray text-white flex-col">
                    <div className="text-2xl">Welcome to the Kingdom Challenges,</div>
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