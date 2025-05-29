import { Link, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken, getPlayerId } from "../../util/auth";
import { useGetFetch } from "../../hooks/useFetch";
import CustomTable from "../../components/UI/CustomTable";
import NoOpenCustomLink from "../../components/UI/NoOpenCustomLink";
import CustomLink from "../../components/UI/CustomLink";

export default function ProfilePage() {
    const data = useRouteLoaderData("root");
    const { bets } = useRouteLoaderData("profile-root");
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className=" w-full max-w-sm py-2">
                    <div className="w-full max-w-sm bg-gray-900 border border-gray-200 rounded-lg px-4 pt-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-36 h-36 mb-3 rounded-full shadow-lg" src={data.image} alt={data.username} />
                            <h2 className="mb-1 text-xl font-medium text-white">{data.discord_handle}</h2>
                            <div className="flex flex-col items-start text-left">
                                <span className="text-xl text-white dark:text-gray-400">{data.username}</span>
                                <span className="text-xl text-white dark:text-gray-400">{data.display_name}</span>
                                <span className="text-sm text-white dark:text-gray-400">{data.nickname}</span>
                            </div>
                            {data.token && (
                                <div className="flex mt-4 md:mt-6">
                                    <Link to={`/profile/edit`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white 
                                    bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                    focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {data && data.length > 0 && (
                    <CustomTable
                        prefix={"bets"}
                        primaryColumn="title"
                        isAsc={false}
                        data={
                            bets.map((bet) => {
                                return {
                                    _id: bet._id,
                                    title: bet.title,
                                    status: bet.status,
                                    link: bet.link,
                                    "date-added": bet["date-added"],
                                    "date-ended": bet["date-ended"]
                                }
                            })}
                        columns={[
                            {
                                "column_name": "Title",
                                "column": "title",
                                element: CustomLink
                            },
                            {
                                "column_name": "Status",
                                "column": "status"
                            },
                            {
                                "column_name": "Link",
                                "column": "link",
                                element: NoOpenCustomLink
                            },
                            {
                                "column_name": "Date Added",
                                "column": "date-added"
                            },
                            {
                                "column_name": "Date Ended",
                                "column": "date-ended"
                            }]}
                        headerStyle="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        rowClass="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        colSize="px-6 py-3"
                    />
                )}
            </div>
        </>
    );
}

export async function loader({ request, params }) {
    const token = getAuthToken();
    if (!token) {
        return redirect('/login');
    }
    const playerId = getPlayerId();
    const data = await useGetFetch(`bets/player/${playerId}`);
    return data;
}