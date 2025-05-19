import { useLoaderData } from "react-router-dom";
import HomeStats from "../components/Statistics/HomeStats";
import { useGetFetch } from "../hooks/useFetch";
import { queryClient } from '../util/http';

export default function HomePage() {
    const data = useLoaderData();
    return (
        <>
            <HomeStats />
        </>
    );
}

export async function loader() {
    return queryClient.fetchQuery({
        queryKey: ['data'],
        queryFn: () => useGetFetch(''),
    });
}