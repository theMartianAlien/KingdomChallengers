import { Link, redirect, useLoaderData, useRouteLoaderData, useSubmit } from "react-router-dom";
import { useDeleteFetch } from "../../hooks/useFetch";
import { getAdminToken } from "../../util/auth";

export default function DiscordList() {
    const players = useLoaderData();
console.log(players);
    return (
        <>
            <h2>
                Discord List
            </h2>
        </>
    );

}