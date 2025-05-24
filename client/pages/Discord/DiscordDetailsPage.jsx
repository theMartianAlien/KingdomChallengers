import { useRouteLoaderData } from "react-router-dom";
import { useGetFetch } from "../../hooks/useFetch";
import UnderlinedLinks from "../../components/UI/Links/UnderlinedLink";

export default function DiscordDetailsPage() {
    const discordUser = useRouteLoaderData('discord-detail');
    return (
        <>
            <div className="max-w-4xl mx-auto p-5 lg:p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg space-y-2 my-10">
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    <strong>Discord handle:</strong>
                    <br />
                    {discordUser.discord_handle}
                </div>
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    <strong>User Key:</strong>
                    <br />
                    {discordUser.user_key}
                </div>
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    <strong>Is Admin:</strong>
                    <br />
                    {discordUser?.isAdmin}
                </div>
                <div className="text-base text-justify whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    <UnderlinedLinks label="Edit" to={`/discord/${discordUser._id}/edit`} />
                </div>
            </div>
        </>
    );
}

export async function loader({ request, params }) {
    return await useGetFetch("discord/" + params.id);
}